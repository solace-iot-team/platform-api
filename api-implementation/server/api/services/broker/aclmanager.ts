import L from '../../../common/logger';
import parser from '@asyncapi/parser';

import { ErrorResponseInternal } from '../../middlewares/error.handler';

import App = Components.Schemas.App;
import Attributes = Components.Schemas.Attributes;
import APIProduct = Components.Schemas.APIProduct;
import ChannelPermission = Components.Schemas.ChannelPermission;
import Permissions = Components.Schemas.Permissions;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import { TopicWildcards } from '../../../common/constants';

import { Service } from '../../../../src/clients/solacecloud/models/Service';
import { AllService, MsgVpnAclProfile, MsgVpnAclProfilePublishException, MsgVpnAclProfilePublishExceptionsResponse, MsgVpnAclProfileSubscribeException, MsgVpnAclProfileSubscribeExceptionsResponse, MsgVpnAuthorizationGroup } from "../../../../src/clients/sempv2";

import ApisService from '../apis.service';
import ApiProductsService from '../apiProducts.service';
import SempV2ClientFactory from './sempv2clientfactory';
import brokerutils from './brokerutils';
import EnvironmentService from '../environments.service';
import APIProductsTypeHelper from '../../../../src/apiproductstypehelper';

export enum Direction {
  Publish = 'Publish',
  Subscribe = 'Subscribe',
}

interface EnvironmentPermissions {
  name: string,
  publishExceptions: string[],
  subscribeExceptions: string[],
}

class ACLManager {
  /**
   * Backwards compatibility - check if ACLs with consumer key as name exist, 
   * this was the naming convention used up until v 0.2.3 
   */
  public async hasConsumerKeyACLs(app: App, services: Service[]): Promise<boolean> {
    let hasACLs: boolean = false;
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);

      try {
        const getResponse = await apiClient.getMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
        hasACLs = true;
      } catch (e) {
        // got a 400 error - not found
      }
    }
    return hasACLs;
  }
  public async createACLs(app: App, services: Service[]): Promise<void> {
    for (const service of services) {
      const objectName = app.internalName;
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      const aclProfile: MsgVpnAclProfile = {
        aclProfileName: objectName,
        clientConnectDefaultAction:
          MsgVpnAclProfile.clientConnectDefaultAction.ALLOW,
        publishTopicDefaultAction:
          MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW,
        subscribeTopicDefaultAction:
          MsgVpnAclProfile.subscribeTopicDefaultAction.DISALLOW,
        msgVpnName: service.msgVpnName,
      };
      try {
        const getResponse = await apiClient.getMsgVpnAclProfile(service.msgVpnName, objectName);
        L.debug(`ACL Looked up ${JSON.stringify(getResponse)}`);
        const responseUpd = await apiClient.updateMsgVpnAclProfile(service.msgVpnName, objectName, aclProfile);
        L.debug(`ACL updated ${JSON.stringify(responseUpd)}`);
      } catch (e) {
        try {
          const response = await apiClient.createMsgVpnAclProfile(service.msgVpnName, aclProfile);
          L.debug(`ACL updated ${JSON.stringify(response)}`);
        } catch (err) {
          throw (err);
        }
      }
    };
  }

  public async deleteACLs(app: App, services: Service[], name: string) {
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        let getResponse = await apiClient.deleteMsgVpnAclProfile(service.msgVpnName, name);
        L.info("ACL deleted");
      } catch (err) {
        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          L.error('deleteACLs');
          L.error(err.body);
          throw err;
        }
      }
    };
  }

  public async createAuthorizationGroups(app: App, services: Service[]): Promise<void> {
    for (const service of services) {
      const objectName: string = app.internalName;
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      const authzGroup: MsgVpnAuthorizationGroup = {
        aclProfileName: objectName,
        authorizationGroupName: objectName,
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        enabled: true
      };
      try {
        const getResponse = await apiClient.getMsgVpnAuthorizationGroup(service.msgVpnName, objectName);
        L.info("AuthorizationGroup Looked up");
        const responseUpd = await apiClient.updateMsgVpnAuthorizationGroup(service.msgVpnName, objectName, authzGroup);
        L.info("AuthorizationGroup updated");
      } catch (e) {

        try {
          let response = await apiClient.createMsgVpnAuthorizationGroup(service.msgVpnName, authzGroup);
          L.info("created  AuthorizationGroup");
        } catch (e) {
          throw e;
        }
      }
    }
  }

  public async deleteAuthorizationGroups(app: App, services: Service[], name: string): Promise<void> {
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const getResponse = await apiClient.deleteMsgVpnAuthorizationGroup(service.msgVpnName, name);
      } catch (err) {

        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          L.error('deleteAuthorizationGroups');
          L.error(err);
          throw err;
        }
      }
    }
  }

  public async createClientACLExceptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {

    const envPermissions: EnvironmentPermissions[] = [];
    // compile list of event destinations sub / pub separately
    for (const product of apiProducts) {
      const publishExceptions = this.getResources(product.pubResources);
      const subscribeExceptions = this.getResources(product.subResources);
      let strs: string[] = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Subscribe);

      for (const s of strs) {
        subscribeExceptions.push(s);
      }
      strs = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Publish);
      for (const s of strs) {
        publishExceptions.push(s);
      }
      for (const env of product.environments) {
        L.info(`environment ${env} product ${product.name}`)
        let permissions: EnvironmentPermissions = envPermissions.find(e => e.name == env);
        if (permissions) {
          permissions.subscribeExceptions = permissions.subscribeExceptions.concat(subscribeExceptions);
          permissions.publishExceptions = permissions.publishExceptions.concat(publishExceptions);

        } else {
          permissions = {
            name: env,
            publishExceptions: publishExceptions,
            subscribeExceptions: subscribeExceptions,

          }

          envPermissions.push(permissions);
        }
      }
    }
    L.info(envPermissions);

    // inject attribute values into parameters within subscriptions
    const attributes: any[] = this.getAttributes(app, ownerAttributes, apiProducts);
    try {
      for (const permissions of envPermissions) {
        const services: Service[] = await brokerutils.getServices([permissions.name]);
        let publishExceptions: string[] = permissions.publishExceptions;
        let subscribeExceptions: string[] = permissions.subscribeExceptions;
        subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
        publishExceptions = this.enrichTopics(publishExceptions, attributes);
        publishExceptions.forEach((s, index, arr) => {
          arr[index] = this.scrubDestination(s);
        });
        subscribeExceptions.forEach((s, index, arr) => {
          arr[index] = this.scrubDestination(s);
        });
        L.info(`provisioning exceptions for env ${permissions.name} to ${services[0].serviceId}`);
        // need to reverse publish->subscribe due to Async API terminology
        const q = await this.addPublishTopicExceptions(app, services, subscribeExceptions);
        const r = await this.addSubscribeTopicExceptions(app, services, publishExceptions);

      }

      if (apiProducts.length == 0) {
        const envNames: string[] = [];
        for (const env of await EnvironmentService.all()) {
          envNames.push(env.name);
        }

        const services: Service[] = await brokerutils.getServices(envNames);
        const q = await this.addPublishTopicExceptions(app, services, []);
        const r = await this.addSubscribeTopicExceptions(app, services, []);
      }

    } catch (e) {
      throw new ErrorResponseInternal(400, e);
    }

  }



  private getAttributes(app: App, ownerAttributes: Attributes, products: APIProduct[]) {
    let attributes = [];
    if (app.attributes) {
      attributes = attributes.concat(app.attributes);
    }
    if (ownerAttributes) {
      attributes = attributes.concat(ownerAttributes);
    }
    products.forEach(p => {
      if (p.attributes) {
        attributes = attributes.concat(p.attributes);
      }
    });
    return attributes;

  }

  private getResources(resources: string[]): string[] {
    const returnResources: string[] = [];
    resources.forEach((resource: string) => returnResources.push(resource));
    L.info(returnResources);
    return returnResources;
  }

  private enrichTopics(destinations: string[], attributes: any[]): string[] {
    let enrichedDestinations: string[] = [];
    destinations.forEach(d => {
      const result = this.enrichDestination(d, attributes);
      enrichedDestinations = enrichedDestinations.concat(result);
    });
    return enrichedDestinations;
  }

  private enrichDestination(destination: string, attributes: any[]): string[] {
    const x = destination.match(/(?<=\{)[^}]*(?=\})/g);
    let destinations: string[] = [];
    destinations.push(destination);
    if (x) {
      x.forEach(match => {
        let newDestinations: string[] = [];
        //L.debug(match);
        const att = attributes.find(element => element.name == match);
        if (att) {
          const values = att.value.split(",");
          //L.debug(values);
          for (const d of destinations) {
            values.forEach((s: string) => {
              s = s.trim();
              const newD = d.replace(`{${match}}`, s);
              //L.debug(newD);
              newDestinations.push(newD);
            });
          }
          destinations = Array.from(newDestinations);
        }

      });
    } else {
      destinations.push(destination);
    }
    return destinations;
  }

  private getResourcesFromAsyncAPIs(apis: string[], direction: Direction): Promise<string[]> {
    return new Promise<string[]>(
      (resolve, reject) => {
        const apiPromises: Promise<string>[] = [];
        apis.forEach((api: string) => {
          let spec: Promise<string>;
          const ref: string[] = api.split('@');
          if (ref.length == 2) {
            spec = ApisService.revisionByVersion(ref[0], ref[1]);
          } else {
            spec = ApisService.byName(api);
          }
          apiPromises.push(spec);
        });
        Promise.all(apiPromises).then(async (specs) => {
          const parserPromises: Promise<any>[] = [];
          const resources: string[] = [];
          specs.forEach((specification: string) => {
            const p: Promise<any> = parser.parse(specification);
            parserPromises.push(p);

            p.then(
              (spec) => {
                spec.channelNames().forEach((s: string) => {

                  const channel = spec.channel(s);

                  if (direction == Direction.Subscribe && channel.hasSubscribe()) {
                    resources.push(s);
                  }
                  if (direction == Direction.Publish && channel.hasPublish()) {
                    resources.push(s);
                  }
                });
              }
            ).catch((e) => {
              L.error(e);
              reject(e);
            });
          });
          Promise.all(parserPromises).then((vals) => {
            resolve(resources);
          });


        });
      }
    );
  }

  private scrubDestination(destination: string, syntax?: TopicSyntax) {
    L.debug(`scrub ${destination}`);
    let scrubbed = destination;
    if (syntax == 'mqtt') {
      scrubbed = destination.replace(/\{[^\/]*\}(?!$)/gi, TopicWildcards.SINGLE_LEVEL_MQTT)
        .replace(/\{[^\/]*\}$/gi, TopicWildcards.MULTI_LEVEL_MQTT)
        .replace(/\/[a-z0-9]*\*/gi, `/${TopicWildcards.SINGLE_LEVEL_MQTT}`);
    } else {
      scrubbed = destination.replace(/\{[^\/]*\}(?!$)/gi, TopicWildcards.SINGLE_LEVEL_SMF).replace(/\{[^\/]*\}$/gi, TopicWildcards.MULTI_LEVEL_SMF);
    }
    L.debug(`scrubbed ${scrubbed}`);
    return scrubbed;
  }

  private async addPublishTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
    for (const service of services) {
      const objectName: string = app.internalName;
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);

      // fix - get all exceptions present on the acl profile  and remove those no longer required
      const currentPublishExceptions: MsgVpnAclProfilePublishExceptionsResponse = await apiClient.getMsgVpnAclProfilePublishExceptions(service.msgVpnName, objectName, 999);
      for (let pe of currentPublishExceptions.data) {
        if (!exceptions.includes(pe.publishExceptionTopic)) {
          await apiClient.deleteMsgVpnAclProfilePublishException(service.msgVpnName, objectName, pe.topicSyntax, encodeURIComponent(pe.publishExceptionTopic));
        }
      }

      for (const exception of exceptions) {
        const aclException: MsgVpnAclProfilePublishException = {
          aclProfileName: objectName,
          msgVpnName: service.msgVpnName,
          publishExceptionTopic: exception,
          topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
        };
        try {
          const getResponse = await apiClient.getMsgVpnAclProfilePublishException(service.msgVpnName, objectName, MsgVpnAclProfilePublishException.topicSyntax.SMF, encodeURIComponent(exception));
          L.info("ACL Looked up");
        } catch (e) {
          L.info(`addPublishTopicExceptions lookup  failed ${e}`);
          try {
            let response = await apiClient.createMsgVpnAclProfilePublishException(service.msgVpnName, objectName, aclException);
            L.info("created PublishException");
          } catch (err) {
            L.info(`addPublishTopicExceptions add failed ${err}`);
            throw err;
          }
        }
      }
    }
  }
  private async addSubscribeTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
    for (const service of services) {
      const objectName: string = app.internalName;
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      // fix - get al exceptions present on the acl profile  and remove those no longer required
      const currentExceptions: MsgVpnAclProfileSubscribeExceptionsResponse = await apiClient.getMsgVpnAclProfileSubscribeExceptions(service.msgVpnName, objectName, 999);
      for (let se of currentExceptions.data) {
        if (!exceptions.includes(se.subscribeExceptionTopic)) {
          await apiClient.deleteMsgVpnAclProfileSubscribeException(service.msgVpnName, objectName, se.topicSyntax, encodeURIComponent(se.subscribeExceptionTopic));
        }
      }
      for (const exception of exceptions) {
        const aclException: MsgVpnAclProfileSubscribeException = {
          aclProfileName: objectName,
          msgVpnName: service.msgVpnName,
          subscribeExceptionTopic: exception,
          topicSyntax: MsgVpnAclProfileSubscribeException.topicSyntax.SMF
        };
        try {
          const getResponse = await apiClient.getMsgVpnAclProfileSubscribeException(service.msgVpnName, objectName, MsgVpnAclProfileSubscribeException.topicSyntax.SMF, encodeURIComponent(exception));
          L.debug("addSubscribeTopicExceptions: exception exists");
        } catch (e) {
          L.warn(`addSubscribeTopicExceptions lookup  failed ${JSON.stringify(e)}`);
          try {
            const response = await apiClient.createMsgVpnAclProfileSubscribeException(service.msgVpnName, objectName, aclException);
            L.debug("created SubscribeException");
          } catch (err) {
            L.error(`addSubscribeTopicExceptions add failed ${err}`);
            throw err;
          }

        }
      }
    }
  }


  private async getChannelPermissionsFromAsyncAPIs(apis: string[], direction: Direction): Promise<{
    [name: string]: ChannelPermission;
  }[]> {
    const resources: string[] = await this.getResourcesFromAsyncAPIs(apis, direction);
    let returnResources: {
      [name: string]: ChannelPermission;
    }[] = [];
    resources.forEach((resource: string) => {
      const channelPermission: ChannelPermission = {
        permissions: [],
        isChannel: true,
      };
      returnResources.push({ [resource]: channelPermission });
    });
    L.info(returnResources);
    return returnResources;

  }
  public getSubscriptionsFromAsyncAPIs(apis: string[]): Promise<string[]> {
    return new Promise<string[]>(
      (resolve, reject) => {
        const apiPromises: Promise<string>[] = [];
        apis.forEach((api: string) => {
          let spec: Promise<string>;
          const ref: string[] = api.split('@');
          if (ref.length == 2) {
            spec = ApisService.revisionByVersion(ref[0], ref[1]);
          } else {
            spec = ApisService.byName(api);
          }
          apiPromises.push(spec);
        });
        Promise.all(apiPromises).then(async (specs) => {
          const parserPromises: Promise<any>[] = [];
          const resources: string[] = [];
          specs.forEach((specification: string) => {
            const p: Promise<any> = parser.parse(specification);
            parserPromises.push(p);

            p.then(
              (spec) => {
                spec.channelNames().forEach((s: string) => {

                  const channel = spec.channel(s);
                  // publish means subscribe - async api transposition
                  if (channel.hasPublish()) {
                    L.info(`getSubscriptionsFromAsyncAPIs subscribe ${s}`)
                    resources.push(s);
                  }
                });
              }
            ).catch((e) => {
              L.error(e);
              reject(e);
            });
          });
          Promise.all(parserPromises).then((vals) => {
            resolve(resources);
          });


        });
      }
    );
  }

  public async getQueueSubscriptionsByApp(app: App): Promise<string[]> {
    const query = {};
    if (app.apiProducts.length == 0) {
      return [];
    } else if ((app.apiProducts.length >= 1)) {
      query['$or'] = [];
      app.apiProducts.forEach(a => query['$or'].push({ name: APIProductsTypeHelper.apiProductReferenceToString(a) }));
    }
    const apiProducts = (await ApiProductsService.all(query)).filter(product=>(product.meta && (!product.meta.stage || product.meta.stage != 'retired')));
    return this.getQueueSubscriptions(app, apiProducts, null);
  }

  public async getQueueSubscriptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<string[]> {
    let subscribeExceptions: string[] = [];
    for (const product of apiProducts) {
      const strs: string[] = await this.getSubscriptionsFromAsyncAPIs(product.apis);
      for (const s of strs) {
        subscribeExceptions.push(s);
      }
      // add in the pubresources as well (again, AsyncAPI reverse )
      subscribeExceptions = subscribeExceptions.concat(product.pubResources);
    }
    if (subscribeExceptions.length < 1) {
      return subscribeExceptions;
    }
    // inject attribute values into parameters within subscriptions
    const attributes: any[] = this.getAttributes(app, ownerAttributes, apiProducts);
    subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
    subscribeExceptions.forEach((s, index, arr) => {
      arr[index] = this.scrubDestination(s);
    });
    return subscribeExceptions;
  }

  public async getClientACLExceptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes, envName: string, syntax?: TopicSyntax): Promise<Permissions> {
    try {
      let publishExceptions: {
        [name: string]: ChannelPermission;
      }[] = [];
      let subscribeExceptions: {
        [name: string]: ChannelPermission;
      }[] = [];
      // compile list of event destinations sub / pub separately
      for (const product of apiProducts) {
        for (const env of product.environments) {
          if (env == envName || envName == undefined) {
            publishExceptions = this.getResourcesAsChannelPermissions(product.pubResources).concat(publishExceptions);
            subscribeExceptions = this.getResourcesAsChannelPermissions(product.subResources).concat(subscribeExceptions);
            let strs: {
              [name: string]: ChannelPermission;
            }[] = await this.getChannelPermissionsFromAsyncAPIs(product.apis, Direction.Subscribe);
            subscribeExceptions = subscribeExceptions.concat(strs);
            strs = await this.getChannelPermissionsFromAsyncAPIs(product.apis, Direction.Publish);
            publishExceptions = publishExceptions.concat(strs);
          }
        }
      }
      let attributes: any[] = this.getAttributes(app, ownerAttributes, apiProducts);
      publishExceptions.forEach((channel, index, arr) => {
        const s: string[] = [];
        L.info(channel);
        s.push(Object.keys(channel)[0]);
        const publishPermissions: string[] = this.enrichTopics(s, attributes);
        publishPermissions.forEach((s, index, arr) => {
          arr[index] = this.scrubDestination(s, syntax);
        });
        channel[Object.keys(channel)[0]].permissions = Array.from(new Set(publishPermissions));
      });
      subscribeExceptions.forEach((channel, index, arr) => {
        const s: string[] = [];
        L.info(channel);
        s.push(Object.keys(channel)[0]);
        const subscribePermissions: string[] = this.enrichTopics(s, attributes);
        subscribePermissions.forEach((s, index, arr) => {
          arr[index] = this.scrubDestination(s, syntax);
        });
        channel[Object.keys(channel)[0]].permissions = Array.from(new Set(subscribePermissions));
      });
      // revert the permissions to match the Async API.
      const permissions: Permissions = {
        publish: publishExceptions,
        subscribe: subscribeExceptions
      }
      return permissions;
    } catch (err) {
      throw err;

    }
  }


  private getResourcesAsChannelPermissions(resources: string[]): {
    [name: string]: ChannelPermission;
  }[] {

    let returnResources: {
      [name: string]: ChannelPermission;
    }[] = [];
    resources.forEach((resource: string) => {
      const channelPermission: ChannelPermission = {
        permissions: [],
        isChannel: false,
      };
      returnResources.push({ [resource]: channelPermission });
    });
    L.info(returnResources);
    return returnResources;
  }

}

export default new ACLManager();
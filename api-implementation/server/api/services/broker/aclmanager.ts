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

import { Service } from '../../../../src/clients/solacecloud';
import { AllService, MsgVpnAclProfile, MsgVpnAclProfilePublishException, MsgVpnAclProfilePublishExceptionsResponse, MsgVpnAclProfileSubscribeException, MsgVpnAclProfileSubscribeExceptionsResponse, MsgVpnAuthorizationGroup } from "../../../../src/clients/sempv2";

import ApisService from '../apis.service';
import SempV2ClientFactory from './sempv2clientfactory';

export enum Direction {
  Publish = 'Publish',
  Subscribe = 'Subscribe',
}

class ACLManager {
  /**
   * Backwards compatibility - check if ACLs with consumer key as name exist, 
   * this was the naming convention used up until v 0.2.3 
   */
  public async hasConsumerKeyACLs(app: App, services: Service[]): Promise<boolean> {
    let hasACLs: boolean = false;
    for (const service of services) {
      const sempv2Client = SempV2ClientFactory.getSEMPv2Client(service);

      try {
        const getResponse = await AllService.getMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
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
      const sempv2Client = SempV2ClientFactory.getSEMPv2Client(service);
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
        const getResponse = await AllService.getMsgVpnAclProfile(service.msgVpnName, objectName);
        L.debug(`ACL Looked up ${JSON.stringify(getResponse)}`);
        const responseUpd = await AllService.updateMsgVpnAclProfile(service.msgVpnName, objectName, aclProfile);
        L.debug(`ACL updated ${JSON.stringify(responseUpd)}`);
      } catch (e) {
        try {
          const response = await AllService.createMsgVpnAclProfile(service.msgVpnName, aclProfile);
          L.debug(`ACL updated ${JSON.stringify(response)}`);
        } catch (err) {
          throw (err);
        }
      }
    };
  }

  public async deleteACLs(app: App, services: Service[], name: string) {
    for (var service of services) {
      var sempv2Client = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        var getResponse = await AllService.deleteMsgVpnAclProfile(service.msgVpnName, name);
        L.info("ACL deleted");
      } catch (err) {
        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          throw err;
        }
      }
    };
  }

  public async createAuthorizationGroups(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      const objectName: string = app.internalName;
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
      var authzGroup: MsgVpnAuthorizationGroup = {
        aclProfileName: objectName,
        authorizationGroupName: objectName,
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        enabled: true
      };
      try {
        var getResponse = await AllService.getMsgVpnAuthorizationGroup(service.msgVpnName, objectName);
        L.info("AuthorizationGroup Looked up");
        var responseUpd = await AllService.updateMsgVpnAuthorizationGroup(service.msgVpnName, objectName, authzGroup);
        L.info("AuthorizationGroup updated");
      } catch (e) {

        try {
          let response = await AllService.createMsgVpnAuthorizationGroup(service.msgVpnName, authzGroup);
          L.info("created  AuthorizationGroup");
        } catch (e) {
          throw e;
        }
      }
    }
  }

  public async deleteAuthorizationGroups(app: App, services: Service[], name: string): Promise<void> {
    for (var service of services) {
      const sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const getResponse = await AllService.deleteMsgVpnAuthorizationGroup(service.msgVpnName, name);
      } catch (err) {
        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          throw err;
        }
      }
    }
  }

  public async createClientACLExceptions(app: App, services: Service[], apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    var publishExceptions: string[] = [];
    var subscribeExceptions: string[] = [];
    // compile list of event destinations sub / pub separately
    for (var product of apiProducts) {
      publishExceptions = this.getResources(product.pubResources).concat(publishExceptions);
      subscribeExceptions = this.getResources(product.subResources).concat(subscribeExceptions);
      var strs: string[] = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Subscribe);
      for (var s of strs) {
        subscribeExceptions.push(s);
      }
      strs = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Publish);
      for (var s of strs) {
        publishExceptions.push(s);
      }
    }

    // inject attribute values into parameters within subscriptions
    var attributes: any[] = this.getAttributes(app, ownerAttributes, apiProducts);
    subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
    publishExceptions = this.enrichTopics(publishExceptions, attributes);
    publishExceptions.forEach((s, index, arr) => {
      arr[index] = this.scrubDestination(s);
    });
    subscribeExceptions.forEach((s, index, arr) => {
      arr[index] = this.scrubDestination(s);
    });
    try {

      // need to reverse publish->subscrobe due to Async API terminology
      var q = await this.addPublishTopicExceptions(app, services, subscribeExceptions);
      var r = await this.addSubscribeTopicExceptions(app, services, publishExceptions);

    } catch (e) {
      throw new ErrorResponseInternal(400, e);
    }

  }



  private getAttributes(app: App, ownerAttributes: Attributes, products: APIProduct[]) {
    var attributes = [];
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
    var returnResources: string[] = [];
    resources.forEach((resource: string) => returnResources.push(resource));
    L.info(returnResources);
    return returnResources;
  }

  private enrichTopics(destinations: string[], attributes: any[]): string[] {
    var enrichedDestinations: string[] = [];
    destinations.forEach(d => {
      var result = this.enrichDestination(d, attributes);
      enrichedDestinations = enrichedDestinations.concat(result);
    });
    return enrichedDestinations;
  }

  private enrichDestination(destination: string, attributes: any[]): string[] {
    var x = destination.match(/(?<=\{)[^}]*(?=\})/g);
    var destinations: string[] = [];
    destinations.push(destination);
    if (x) {
      x.forEach(match => {
        var newDestinations: string[] = [];
        //L.debug(match);
        var att = attributes.find(element => element.name == match);
        if (att) {
          var values = att.value.split(",");
          //L.debug(values);
          for (var d of destinations) {
            values.forEach((s: string) => {
              s = s.trim();
              var newD = d.replace(`{${match}}`, s);
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
        var apiPromises: Promise<string>[] = [];
        apis.forEach((api: string) => {
          apiPromises.push(ApisService.byName(api));
        });
        Promise.all(apiPromises).then(async (specs) => {
          var parserPromises: Promise<any>[] = [];
          var resources: string[] = [];
          specs.forEach((specification: string) => {
            var p: Promise<any> = parser.parse(specification);
            parserPromises.push(p);

            p.then(
              (spec) => {
                spec.channelNames().forEach((s: string) => {

                  var channel = spec.channel(s);

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
    for (var service of services) {
      const objectName: string = app.internalName;
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);

      // fix - get all exceptions present on the acl profile  and remove those no longer required
      var currentPublishExceptions : MsgVpnAclProfilePublishExceptionsResponse = await AllService.getMsgVpnAclProfilePublishExceptions(service.msgVpnName, objectName, 999);
      for(let pe of currentPublishExceptions.data){
        if (!exceptions.includes(pe.publishExceptionTopic)){
          await AllService.deleteMsgVpnAclProfilePublishException(service.msgVpnName, objectName, pe.topicSyntax, encodeURIComponent(pe.publishExceptionTopic));
        }
      }

      for (var exception of exceptions) {
        var aclException: MsgVpnAclProfilePublishException = {
          aclProfileName: objectName,
          msgVpnName: service.msgVpnName,
          publishExceptionTopic: exception,
          topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
        };
        try {
          var getResponse = await AllService.getMsgVpnAclProfilePublishException(service.msgVpnName, objectName, MsgVpnAclProfilePublishException.topicSyntax.SMF, encodeURIComponent(exception));
          L.info("ACL Looked up");
        } catch (e) {
          L.info(`addPublishTopicExceptions lookup  failed ${e}`);
          try {
            let response = await AllService.createMsgVpnAclProfilePublishException(service.msgVpnName, objectName, aclException);
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
    for (var service of services) {
      const objectName: string = app.internalName;      
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
      // fix - get al exceptions present on the acl profile  and remove those no longer required
      var currentExceptions : MsgVpnAclProfileSubscribeExceptionsResponse = await AllService.getMsgVpnAclProfileSubscribeExceptions(service.msgVpnName, objectName, 999);
      for(let se of currentExceptions.data){
        if (!exceptions.includes(se.subscribeExceptionTopic)){
          await AllService.deleteMsgVpnAclProfileSubscribeException(service.msgVpnName, objectName, se.topicSyntax, encodeURIComponent(se.subscribeExceptionTopic));
        }
      }
      for (var exception of exceptions) {
        var aclException: MsgVpnAclProfileSubscribeException = {
          aclProfileName: objectName,
          msgVpnName: service.msgVpnName,
          subscribeExceptionTopic: exception,
          topicSyntax: MsgVpnAclProfileSubscribeException.topicSyntax.SMF
        };
        try {
          var getResponse = await AllService.getMsgVpnAclProfileSubscribeException(service.msgVpnName, objectName, MsgVpnAclProfileSubscribeException.topicSyntax.SMF, encodeURIComponent(exception));
          L.debug("addSubscribeTopicExceptions: exception exists");
        } catch (e) {
          L.warn(`addSubscribeTopicExceptions lookup  failed ${JSON.stringify(e)}`);
          try {
            let response = await AllService.createMsgVpnAclProfileSubscribeException(service.msgVpnName, objectName, aclException);
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
        var apiPromises: Promise<string>[] = [];
        apis.forEach((api: string) => {
          apiPromises.push(ApisService.byName(api));
        });
        Promise.all(apiPromises).then(async (specs) => {
          var parserPromises: Promise<any>[] = [];
          var resources: string[] = [];
          specs.forEach((specification: string) => {
            var p: Promise<any> = parser.parse(specification);
            parserPromises.push(p);

            p.then(
              (spec) => {
                spec.channelNames().forEach((s: string) => {

                  var channel = spec.channel(s);
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

  public async getQueueSubscriptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<string[]> {
    var subscribeExceptions: string[] = [];
    for (var product of apiProducts) {
      var strs: string[] = await this.getSubscriptionsFromAsyncAPIs(product.apis);
      for (var s of strs) {
        subscribeExceptions.push(s);
      }
      // add in the pubresources as well (again, AsyncAPI reverse )
      subscribeExceptions = subscribeExceptions.concat(product.pubResources);
    }
    if (subscribeExceptions.length < 1) {
      return subscribeExceptions;
    }
    // inject attribute values into parameters within subscriptions
    var attributes: any[] = this.getAttributes(app, ownerAttributes, apiProducts);
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
          if (env == envName) {
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
        channel[Object.keys(channel)[0]].permissions = publishPermissions;
      });
      subscribeExceptions.forEach((channel, index, arr) => {
        const s: string[] = [];
        L.info(channel);
        s.push(Object.keys(channel)[0]);
        const subscribePermissions: string[] = this.enrichTopics(s, attributes);
        subscribePermissions.forEach((s, index, arr) => {
          arr[index] = this.scrubDestination(s, syntax);
        });
        channel[Object.keys(channel)[0]].permissions = subscribePermissions;
      });
      var permissions: Permissions = {
        publish: subscribeExceptions,
        subscribe: publishExceptions
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
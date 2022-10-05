import L from '../../../common/logger';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

import App = Components.Schemas.App;
import Attributes = Components.Schemas.Attributes;
import APIProduct = Components.Schemas.APIProduct;
import ChannelPermission = Components.Schemas.ChannelPermission;
import Permissions = Components.Schemas.Permissions;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import { TopicWildcards } from '../../../common/constants';

import { Service } from '../../../../src/clients/solacecloud/models/Service';


import ApisService from '../apis.service';
import ApiProductsService from '../apiProducts.service';
import brokerutils from './brokerutils';
import APIProductsTypeHelper from '../../../../src/apiproductstypehelper';
import MsgVpnAclProfile = Components.Schemas.MsgVpnAclProfile;
import MsgVpnAuthorizationGroup = Components.Schemas.MsgVpnAuthorizationGroup;
import MsgVpnQueueSubscription = Components.Schemas.MsgVpnQueueSubscription;
import _ from 'lodash';

import { Direction } from '../../../../src/asyncapihelper';
import asyncAPIHelper from '../../../../src/asyncapihelper';

interface EnvironmentPermissions {
  name: string,
  publishExceptions: string[],
  subscribeExceptions: string[],
}

class ACLManager {

  public async createACLs(app: App, environmentNames: string[]): Promise<MsgVpnAclProfile> {
    const objectName = app.internalName;
    const aclProfile: MsgVpnAclProfile = {
      aclProfileName: objectName,
      clientConnectDefaultAction:
        'allow',
      publishTopicDefaultAction:
        'disallow',
      subscribeTopicDefaultAction:
        'disallow',
      publishExceptions: [],
      subscribeExceptions: [],
      tags: ['app', app.name, app.internalName],
      environments: environmentNames
    };

    return aclProfile;
  }

  public async createAuthorizationGroups(app: App, clientProfileName: string, environmentNames: string[]): Promise<MsgVpnAuthorizationGroup> {
    const objectName: string = app.internalName;
    const authzGroup: MsgVpnAuthorizationGroup = {
      aclProfileName: objectName,
      authorizationGroupName: objectName,
      clientProfileName: clientProfileName,
      enabled: true,
      environments: environmentNames
    };
    return authzGroup;
  }

  public async createClientACLExceptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes, aclProfileConfig: MsgVpnAclProfile): Promise<void> {

    const envPermissions: EnvironmentPermissions[] = [];
    const apiAttributes: Attributes = [];
    // compile list of event destinations sub / pub separately
    for (const product of apiProducts) {
      const publishExceptions = this.getResources(product.pubResources);
      const subscribeExceptions = this.getResources(product.subResources);

      
      let strs: string[] = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Subscribe);
      (await this.getEnumsFromAsyncAPIs(product.apis)).forEach(a=>{
        if (!apiAttributes.find(p=>a.name==p.name)){
          apiAttributes.push(a);
        }
      });
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

    const attributes: any[] = this.getAttributes(app, ownerAttributes, apiAttributes , apiProducts);
    aclProfileConfig.publishExceptions = [];
    aclProfileConfig.subscribeExceptions = [];
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
        // reverse the verbs for Async API conformity
        subscribeExceptions.forEach(p => aclProfileConfig.publishExceptions.push({
          publishTopicException: p,
          publishTopicExceptionSyntax: 'smf',
          environments: [permissions.name]
        }));
        publishExceptions.forEach(p => aclProfileConfig.subscribeExceptions.push({
          subscribeTopicException: p,
          subscribeTopicExceptionSyntax: 'smf',
          environments: [permissions.name]
        }));

        // dedupe the exceptions
        const sExceptions = _.uniqWith(aclProfileConfig.subscribeExceptions, (a, b) => (
          (_.intersection(a.environments, b.environments).length == a.environments.length && a.environments.length == b.environments.length) && a.subscribeTopicException == b.subscribeTopicException));
        aclProfileConfig.subscribeExceptions = sExceptions;
        const pExceptions = _.uniqWith(aclProfileConfig.publishExceptions, (a, b) => (
          (_.intersection(a.environments, b.environments).length == a.environments.length && a.environments.length == b.environments.length) && a.publishTopicException == b.publishTopicException));
        aclProfileConfig.publishExceptions = pExceptions;
      }
    } catch (e) {
      throw new ErrorResponseInternal(400, e);
    }

  }



  private getAttributes(app: App, ownerAttributes: Attributes, apiAttributes: Attributes, products: APIProduct[]) {
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
    attributes = attributes.concat(apiAttributes);
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

  private async getResourcesFromAsyncAPIs(apis: string[], direction: Direction): Promise<string[]> {

    let resources: string[] = [];
    const specs: string[] = [];
    for (const api of apis) {
      specs.push(await ApisService.byApiReference(api));
    }
    for (const specification of specs) {
      resources = resources.concat(await asyncAPIHelper.getChannelResources(specification, direction));
    }
    return resources;
  }


  private async getEnumsFromAsyncAPIs(apis: string[]): Promise<Attributes> {

    let attributes: Attributes = [];
    const specs: string[] = [];
    for (const api of apis) {
      specs.push(await ApisService.byApiReference(api));
    }
    for (const specification of specs) {
      attributes = attributes.concat(await asyncAPIHelper.getParameterEnums(specification));
    }

    return attributes;
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
    return this, this.getResourcesFromAsyncAPIs(apis, Direction.Publish);
  }

  public async getQueueSubscriptionsByApp(app: App): Promise<MsgVpnQueueSubscription[]> {
    const query = {};
    if (app.apiProducts.length == 0) {
      return [];
    } else if ((app.apiProducts.length >= 1)) {
      query['$or'] = [];
      app.apiProducts.forEach(a => query['$or'].push({ name: APIProductsTypeHelper.apiProductReferenceToString(a) }));
    }
    const apiProducts = (await ApiProductsService.all(query)).filter(product => (product.meta && (!product.meta.stage || product.meta.stage != 'retired')));
    return this.getQueueSubscriptions(app, apiProducts, null);
  }

  public async getQueueSubscriptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnQueueSubscription[]> {
    let subscribeExceptions: MsgVpnQueueSubscription[] = [];
    const apiAttributes: Attributes = [];
    for (const product of apiProducts) {
      (await this.getEnumsFromAsyncAPIs(product.apis)).forEach(a=>{
        if (!apiAttributes.find(p=>p.name==a.name)){
          apiAttributes.push(a);
        }
      })
      const strs: string[] = await this.getSubscriptionsFromAsyncAPIs(product.apis);
      for (const s of strs) {
        subscribeExceptions.push({
          environments: product.environments,
          subscriptionTopic: s,
        });
      }
      // add in the pubresources as well (again, AsyncAPI reverse )
      for (const pubResource of product.pubResources) {
        subscribeExceptions.push({
          environments: product.environments,
          subscriptionTopic: pubResource
        });
      }
    }
    if (subscribeExceptions.length < 1) {
      return subscribeExceptions;
    }
    // inject attribute values into parameters within subscriptions
    const attributes: any[] = this.getAttributes(app, ownerAttributes, apiAttributes, apiProducts);
    const enrichedSubscriptions: MsgVpnQueueSubscription[] = [];
    for (const s of subscribeExceptions) {
      const enrichedTopics = this.enrichDestination(s.subscriptionTopic, attributes);
      enrichedTopics.forEach(t => enrichedSubscriptions.push({
        environments: s.environments,
        subscriptionTopic: t
      }));
    }
    enrichedSubscriptions.forEach((s, index, arr) => {
      s.subscriptionTopic = this.scrubDestination(s.subscriptionTopic);
    });
    return enrichedSubscriptions;
  }

  public async getClientACLExceptions(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes, envName: string, syntax?: TopicSyntax): Promise<Permissions> {
      let publishExceptions: {
        [name: string]: ChannelPermission;
      }[] = [];
      let subscribeExceptions: {
        [name: string]: ChannelPermission;
      }[] = [];
      // compile list of event destinations sub / pub separately
      const apiAttributes: Attributes = [];
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
            (await this.getEnumsFromAsyncAPIs(product.apis)).forEach(a=>{
              if (!apiAttributes.find(p=>p.name==a.name)){
                apiAttributes.push(a);
              }
            });
          }
        }
      }
      let attributes: any[] = this.getAttributes(app, ownerAttributes, apiAttributes, apiProducts);
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
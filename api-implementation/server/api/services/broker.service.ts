import L from '../../common/logger';

import App = Components.Schemas.App;
import Developer = Components.Schemas.Developer;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import Permissions = Components.Schemas.Permissions;
import ChannelPermission = Components.Schemas.ChannelPermission;
import Endpoint = Components.Schemas.Endpoint;
import AppEnvironment = Components.Schemas.AppEnvironment;
import WebHook = Components.Schemas.WebHook;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;

import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';

import { ProtocolMapper } from '../../../src/protocolmapper';

import EnvironmentsService from './environments.service';
import { Service } from '../../../src/clients/solacecloud';
import {
  AllService, MsgVpnClientUsername,
  MsgVpnAclProfile,
  MsgVpnAclProfilePublishException,
  MsgVpnAclProfileSubscribeException,
  MsgVpnQueue,
  MsgVpnQueueSubscription,
  MsgVpnRestDeliveryPoint,
  MsgVpnRestDeliveryPointRestConsumer,
  MsgVpnRestDeliveryPointQueueBinding,
  MsgVpnAuthorizationGroup
} from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { Sempv2Client } from '../../../src/sempv2-client';
import { ns } from '../middlewares/context.handler';

import parser from '@asyncapi/parser';

import { ErrorResponseInternal } from '../middlewares/error.handler';
import { TopicWildcards } from '../../common/constants';

enum Direction {
  Publish = 'Publish',
  Subscribe = 'Subscribe',
}

class BrokerService {
  async getPermissions(app: App, developer: Developer, envName: string, syntax: TopicSyntax): Promise<Permissions> {
    const products: APIProduct[] = [];
    try {
      for (const productName of app.apiProducts) {
        const product = await ApiProductsService.byName(productName);
        products.push(product);
      }
      var permissions: Permissions = await this.getClientACLExceptions(app, products, developer, envName, syntax);
      return permissions;
    } catch (err) {
      L.error("Get permissions error");
      throw new ErrorResponseInternal(500, err);
    }
  }

  provisionApp(app: App, developer: Developer): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      var apiProductPromises: Promise<APIProduct>[] = [];
      app.apiProducts.forEach((productName: string) => {
        L.info(productName);
        apiProductPromises.push(ApiProductsService.byName(productName));
      });

      Promise.all(apiProductPromises).then(async (productResults: APIProduct[]) => {
        try {

          for (var product of productResults) {
            var environmentNames: string[] = [];
            product.environments.forEach((e: string) => {
              environmentNames.push(e);
            })
            L.info(`env: ${product.environments}`);
            var products: APIProduct[] = [];
            products.push(product);
            environmentNames = Array.from(new Set(environmentNames));
            L.info(`provisioning product ${product.name} to ${JSON.stringify(environmentNames)}`);
            const services = await this.getServices(environmentNames);
            var a = await this.createACLs(app, services);
            L.info(`created acl profile ${app.name}`);
            var b = await this.createClientUsernames(app, services);
            L.info(`created client username ${app.name}`);
            var e = await this.createAuthorizationGroups(app, services);
            L.info(`created client username ${app.name}`);
            var c = await this.createClientACLExceptions(app, services, products, developer);
            L.info(`created acl exceptions ${app.name}`);
            // no webhook - no RDP
            //L.info(app.webHooks);
            if (app.webHooks != null && app.webHooks.length > 0) {
              L.info("creating webhook");
              var d = await this.createQueues(app, services, products, developer);
              L.info(`created queues ${app.name}`);
              var d = await this.createRDP(app, services, products);
              L.info(`created rdps ${app.name}`);
            }

          }
          resolve();
        } catch (e) {
          L.error(`Provisioning error ${e}`);
          reject(new ErrorResponseInternal(500, e));
        }
      });
    });
  }

  async deprovisionApp(app: App) {
    var environmentNames: string[] = [];

    const products: APIProduct[] = [];
    for (const productName of app.apiProducts) {
      L.info(productName);
      const product = await ApiProductsService.byName(productName);
      products.push(product);
    }
    products.forEach((product: APIProduct) => {
      product.environments.forEach((e: string) => {
        environmentNames.push(e);
      })
      L.info(`env: ${product.environments}`);
    });
    environmentNames = Array.from(new Set(environmentNames));

    try {
      const services = await this.getServices(environmentNames);
      await this.deleteClientUsernames(app, services);
      await this.deleteAuthorizationGroups(app, services);
      await this.deleteACLs(app, services);
      await this.deleteRDPs(app, services);
      await this.deleteQueues(app, services);
    } catch (err) {
      L.error('De-Provisioninig error');
      throw new ErrorResponseInternal(500, err.message);
    }
  }

  private async getServices(environmentNames: string[]): Promise<Service[]> {
    try {
      L.info(`all-env: ${environmentNames}`);
      const returnServices: Service[] = [];
      for (const envName of environmentNames) {
        L.info(envName);
        const env: Environment = await EnvironmentsService.byName(envName);
        L.info(env.serviceId);
        const service: Service = await SolaceCloudFacade.getServiceByEnvironment(
          env
        );
        service['environment'] = env.name;
        returnServices.push(service);
      }
      return returnServices;
    } catch (err) {
      L.error(`getServices - ${JSON.stringify(err)}`);
      throw err;
    }
  }

  private async getServiceByEnv(envName: string): Promise<Service> {
    try {
      L.info(envName);
      const env = await EnvironmentsService.byName(envName);
      L.info(env.serviceId);
      const service = await SolaceCloudFacade.getServiceByEnvironment(env);
      return service;
    } catch (err) {
      L.error(`getServiceByEnv - ${JSON.stringify(err)}`);
      throw err;
    }
  }

  private async createACLs(app: App, services: Service[]): Promise<void> {
    for (const service of services) {
      const sempv2Client = this.getSEMPv2Client(service);
      const aclProfile: MsgVpnAclProfile = {
        aclProfileName: app.credentials.secret.consumerKey,
        clientConnectDefaultAction:
          MsgVpnAclProfile.clientConnectDefaultAction.ALLOW,
        publishTopicDefaultAction:
          MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW,
        subscribeTopicDefaultAction:
          MsgVpnAclProfile.subscribeTopicDefaultAction.DISALLOW,
        msgVpnName: service.msgVpnName,
      };
      try {
        const getResponse = await AllService.getMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
        L.debug(`ACL Looked up ${JSON.stringify(getResponse)}`);
        const responseUpd = await AllService.updateMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey, aclProfile);
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

  private async deleteACLs(app: App, services: Service[]) {
    for (var service of services) {
      var sempv2Client = this.getSEMPv2Client(service);
      try {
        var getResponse = await AllService.deleteMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("ACL deleted");
      } catch (err) {
        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          throw err;
        }
      }
    };
  }

  private async deleteQueues(app: App, services: Service[]) {
    for (var service of services) {
      var sempv2Client = this.getSEMPv2Client(service);
      try {
        var getResponse = await AllService.deleteMsgVpnQueue(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info('Queue deleted');
      } catch (e) {
        if (!(e.body.meta.error.status == "NOT_FOUND")) {
          throw e;
        }

      }
    };
  }

  private async deleteRDPs(app: App, services: Service[]) {
    for (var service of services) {
      var sempv2Client = this.getSEMPv2Client(service);
      try {
        var getResponse = await AllService.deleteMsgVpnRestDeliveryPoint(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("RDP deleted");
      } catch (e) {
        if (!(e.body.meta.error.status == "NOT_FOUND"))
          throw e;
      }
    }
  }

  private async createAuthorizationGroups(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      var sempV2Client = this.getSEMPv2Client(service);
      var authzGroup: MsgVpnAuthorizationGroup = {
        aclProfileName: app.credentials.secret.consumerKey,
        authorizationGroupName: app.credentials.secret.consumerKey,
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        enabled: true        
      };
      try {
        var getResponse = await AllService.getMsgVpnAuthorizationGroup(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("AuthorizationGroup Looked up");
        var responseUpd = await AllService.updateMsgVpnAuthorizationGroup(service.msgVpnName, app.credentials.secret.consumerKey, authzGroup);
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

  private async deleteAuthorizationGroups(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      const sempV2Client = this.getSEMPv2Client(service);
      try {
        const getResponse = await AllService.deleteMsgVpnAuthorizationGroup(service.msgVpnName, app.credentials.secret.consumerKey);
      } catch (err) {
        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          throw err;
        }
      }
    }
  }

  private async createClientUsernames(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      var sempV2Client = this.getSEMPv2Client(service);
      var clientUsername: MsgVpnClientUsername = {
        aclProfileName: app.credentials.secret.consumerKey,
        clientUsername: app.credentials.secret.consumerKey,
        password: app.credentials.secret.consumerSecret,
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        enabled: true
      };
      try {
        var getResponse = await AllService.getMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("Client Username Looked up");
        var responseUpd = await AllService.updateMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey, clientUsername);
        L.info("Client Username updated");
      } catch (e) {

        try {
          let response = await AllService.createMsgVpnClientUsername(service.msgVpnName, clientUsername);
          L.info("created  Client Username");
        } catch (e) {
          throw e;
        }
      }
    }
  }


  private async deleteClientUsernames(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      const sempV2Client = this.getSEMPv2Client(service);
      try {
        const getResponse = await AllService.deleteMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
      } catch (err) {
        if (!(err.body.meta.error.status == "NOT_FOUND")) {
          throw err;
        }
      }
    }
  }

  private async createClientACLExceptions(app: App, services: Service[], apiProducts: APIProduct[], developer: Developer): Promise<void> {
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
    var attributes: any[] = this.getAttributes(app, developer, apiProducts);
    subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
    publishExceptions = this.enrichTopics(publishExceptions, attributes);
    publishExceptions.forEach((s, index, arr) => {
      arr[index] = this.scrubDestination(s);
    });
    subscribeExceptions.forEach((s, index, arr) => {
      arr[index] = this.scrubDestination(s);
    });
    try {

      // need to reverse pubish->subscrobe due to Async API terminology
      var q = await this.addPublishTopicExceptions(app, services, subscribeExceptions);
      var r = await this.addSubscribeTopicExceptions(app, services, publishExceptions);

    } catch (e) {
      throw new ErrorResponseInternal(400, e);
    }

  }



  private getAttributes(app: App, developer: Developer, products: APIProduct[]) {
    var attributes = [];
    if (app.attributes) {
      attributes = attributes.concat(app.attributes);
    }
    if (developer.attributes) {
      attributes = attributes.concat(developer.attributes);
    }
    products.forEach(p => {
      if (p.attributes) {
        attributes = attributes.concat(p.attributes);
      }
    });
    return attributes;

  }

  private async createRDP(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
    L.info(`createRDP services: ${services}`);
    var subscribeExceptions: string[] = [];
    var useTls: boolean = false;
    for (var product of apiProducts) {
      var strs: string[] = await this.getRDPSubscriptionsFromAsyncAPIs(product.apis);
      for (var s of strs) {
        subscribeExceptions.push(s);
      }
      for (var p of product.protocols) {
        if (p.name == "https") {
          useTls = true;
        }
      }
    }
    if (subscribeExceptions.length < 1) {
      return;
    }
    // loop over services
    for (var service of services) {
      var restConsumerName = `Consumer`;
      var rdpUrl: URL;
      var webHooks: WebHook[] = [];
      webHooks = app.webHooks.filter(w => w.environments == null || w.environments.find(e => e == service['environment']));
      if (webHooks.length != 1) {
        var msg: string = `Invalid webhook configuration for ${service['environment']}, found ${webHooks.length} matching configurations`;
        L.warn(msg);
        throw new ErrorResponseInternal(400, msg);
      }
      var webHook = webHooks[0];
      try {
        rdpUrl = new URL(webHook.uri);
      } catch (e) {
        throw new ErrorResponseInternal(400, "Webhook URL not provided or invalid");
      }

      var protocol = rdpUrl.protocol.toUpperCase();
      var port = rdpUrl.port;
      if (protocol == "HTTPS:") {
        useTls = true;
      }
      L.debug(`protocol is ${protocol}`);
      if (port == "") {
        if (useTls) {
          port = '443';
        } else {
          port = '80';
        }
      }
      //create RDPs
      var sempV2Client = this.getSEMPv2Client(service);
      var newRDP: MsgVpnRestDeliveryPoint = {
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        restDeliveryPointName: app.credentials.secret.consumerKey,
        enabled: false
      };
      try {
        var q = await AllService.getMsgVpnRestDeliveryPoint(service.msgVpnName, app.credentials.secret.consumerKey);
        var updateResponse = await AllService.updateMsgVpnRestDeliveryPoint(service.msgVpnName, app.credentials.secret.consumerKey, newRDP);
        L.debug(`createRDP updated ${app.credentials.secret.consumerKey}`);
      } catch (e: any) {
        L.debug(`createRDP lookup  failed ${JSON.stringify(e)}`);
        try {
          var q = await AllService.createMsgVpnRestDeliveryPoint(service.msgVpnName, newRDP);
        } catch (e) {
          L.warn(`createRDP creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }
      }
      var authScheme = webHook.authentication && webHook.authentication['username'] ? MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.HTTP_BASIC : MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.NONE;
      if (authScheme == MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.NONE) {
        authScheme = webHook.authentication && webHook.authentication['headerName'] ? MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.HTTP_HEADER : MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.NONE;
      }
      var method = webHook.method == 'PUT' ? MsgVpnRestDeliveryPointRestConsumer.httpMethod.PUT : MsgVpnRestDeliveryPointRestConsumer.httpMethod.POST;

      var connectionCount: number = 3;
      if (webHook.mode == 'serial') {
        connectionCount = 1;
      }
      var newRDPConsumer: MsgVpnRestDeliveryPointRestConsumer = {
        msgVpnName: service.msgVpnName,
        restDeliveryPointName: app.credentials.secret.consumerKey,
        restConsumerName: restConsumerName,
        remotePort: parseInt(port),
        remoteHost: rdpUrl.hostname,
        tlsEnabled: useTls,
        enabled: false,
        authenticationScheme: authScheme,
        httpMethod: method,
        maxPostWaitTime: 90,
        outgoingConnectionCount: connectionCount,
        retryDelay: 10
      };

      MsgVpnRestDeliveryPointRestConsumer.httpMethod.POST
      if (authScheme == MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.HTTP_BASIC) {
        newRDPConsumer.authenticationHttpBasicUsername = webHook.authentication['username'];
        newRDPConsumer.authenticationHttpBasicPassword = webHook.authentication['password'];
      }
      if (authScheme == MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.HTTP_HEADER) {
        newRDPConsumer.authenticationHttpHeaderName = webHook.authentication['headerName'];
        newRDPConsumer.authenticationHttpHeaderValue = webHook.authentication['headerValue'];
      }

      try {
        var r = await AllService.getMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, app.credentials.secret.consumerKey, restConsumerName);
        var updateResponseRDPConsumer = await AllService.updateMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, app.credentials.secret.consumerKey, restConsumerName, newRDPConsumer);
        L.debug(`createRDP consumer updated ${app.credentials.secret.consumerKey}`);
      } catch (e: any) {
        L.debug(`createRDP consumer lookup  failed ${JSON.stringify(e)}`);
        try {
          var r = await AllService.createMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, app.credentials.secret.consumerKey, newRDPConsumer);
        } catch (e) {
          L.warn(`createRDP consumer creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }
      }
      var newRDPQueueBinding: MsgVpnRestDeliveryPointQueueBinding = {
        msgVpnName: service.msgVpnName,
        restDeliveryPointName: app.credentials.secret.consumerKey,
        postRequestTarget: `${rdpUrl.pathname}${rdpUrl.search}`,
        queueBindingName: app.credentials.secret.consumerKey
      };
      try {
        var b = await AllService.getMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, app.credentials.secret.consumerKey, app.credentials.secret.consumerKey);

        var updateResponseQueueBinding = await AllService.updateMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, app.credentials.secret.consumerKey, app.credentials.secret.consumerKey, newRDPQueueBinding);
        L.debug(`createRDP queue binding updated ${app.credentials.secret.consumerKey}`);
      } catch (e: any) {
        L.debug(`createRDP queue binding lookup  failed ${JSON.stringify(e)}`);
        try {
          var b = await AllService.createMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, app.credentials.secret.consumerKey, newRDPQueueBinding);
        } catch (e) {
          L.warn(`createRDP queue binding creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }
      }

      // enable the RDP
      try {
        var enableRDP: MsgVpnRestDeliveryPoint = {
          enabled: true
        }; var enableRDPResponse = await AllService.updateMsgVpnRestDeliveryPoint(service.msgVpnName, app.credentials.secret.consumerKey, enableRDP);
        L.debug(`createRDP enabled ${app.credentials.secret.consumerKey}`);
      } catch (e: any) {
        L.error(`createRDP enable failed ${JSON.stringify(e)}`);
        throw new ErrorResponseInternal(500, e);
      }

      // enable the RDP consumer

      try {
        var enableRDPConsumer: MsgVpnRestDeliveryPointRestConsumer = {
          enabled: true
        };
        var updateResponseRDPConsumer = await AllService.updateMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, app.credentials.secret.consumerKey, restConsumerName, enableRDPConsumer);
        L.debug(`createRDP consumer enabled ${app.credentials.secret.consumerKey}`);
      } catch (e: any) {
        L.debug(`createRDP consumer enablement  failed ${JSON.stringify(e)}`);
        throw new ErrorResponseInternal(500, e);
      }
    }
  }


  private async createQueues(app: App, services: Service[], apiProducts: APIProduct[], developer: Developer): Promise<void> {
    L.info(`createQueueSubscriptions services: ${services}`);
    var subscribeExceptions: string[] = [];
    for (var product of apiProducts) {
      var strs: string[] = await this.getRDPSubscriptionsFromAsyncAPIs(product.apis);
      for (var s of strs) {
        subscribeExceptions.push(s);
      }
      // add in the pubresources as well (again, AsyncAPI reverse )
      subscribeExceptions = subscribeExceptions.concat(product.pubResources);
    }
    if (subscribeExceptions.length < 1) {
      return;
    }
    // inject attribute values into parameters within subscriptions
    var attributes: any[] = this.getAttributes(app, developer, apiProducts);
    subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
    subscribeExceptions.forEach((s, index, arr) => {
      arr[index] = this.scrubDestination(s);
    });

    // loop over services
    for (var service of services) {
      //create queues
      var sempV2Client = this.getSEMPv2Client(service);
      var newQ: MsgVpnQueue = {
        queueName: app.credentials.secret.consumerKey,
        msgVpnName: service.msgVpnName,
        ingressEnabled: true,
        egressEnabled: true,
        owner: app.credentials.secret.consumerKey,
        permission: MsgVpnQueue.permission.CONSUME
      };
      try {
        var q = await AllService.getMsgVpnQueue(service.msgVpnName, app.credentials.secret.consumerKey);
        var updateResponseMsgVpnQueue = await AllService.updateMsgVpnQueue(service.msgVpnName, app.credentials.secret.consumerKey, newQ);
        L.debug(`createQueues updated ${app.credentials.secret.consumerKey}`);
      } catch (e: any) {
        L.debug(`createQueues lookup  failed ${JSON.stringify(e)}`);
        try {
          var q = await AllService.createMsgVpnQueue(service.msgVpnName, newQ);
        } catch (e) {
          L.warn(`createQueues creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e.message);
        }
      }

      for (var subscription of subscribeExceptions) {
        var queueSubscription: MsgVpnQueueSubscription = {
          msgVpnName: service.msgVpnName,
          queueName: app.credentials.secret.consumerKey,
          subscriptionTopic: subscription
        }
        try {
          var subResult = await AllService.getMsgVpnQueueSubscription(service.msgVpnName, app.credentials.secret.consumerKey, encodeURIComponent(subscription));
        } catch (e: any) {
          L.debug(`createQueues subscription lookup  failed ${JSON.stringify(e)}`);
          try {
            var subResult = await AllService.createMsgVpnQueueSubscription(service.msgVpnName, app.credentials.secret.consumerKey, queueSubscription);
          } catch (e) {
            L.warn(`createQueues subscription creation  failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e.message);
          }
        }
      }
    }
  }

  public async getClientACLExceptions(app: App, apiProducts: APIProduct[], developer: Developer, envName: string, syntax?: TopicSyntax): Promise<Permissions> {
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
      let attributes: any[] = this.getAttributes(app, developer, apiProducts);
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
      // subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
      // publishExceptions = this.enrichTopics(publishExceptions, attributes);
      // publishExceptions.forEach((s, index, arr) => {
      //   arr[index] = this.scrubDestination(s, syntax);
      // });
      // subscribeExceptions.forEach((s, index, arr) => {
      //   arr[index] = this.scrubDestination(s, syntax);
      // });
      //subscribeExceptions = Array.from(new Set(subscribeExceptions));
      //publishExceptions = Array.from(new Set(publishExceptions));

      // reverse - Async API usage of verbs
      var permissions: Permissions = {
        publish: subscribeExceptions,
        subscribe: publishExceptions
      }
      return permissions;
    } catch (err) {
      throw err;

    }
  }


  private async addPublishTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
    for (var service of services) {
      var sempV2Client = this.getSEMPv2Client(service);
      for (var exception of exceptions) {
        var aclException: MsgVpnAclProfilePublishException = {
          aclProfileName: app.credentials.secret.consumerKey,
          msgVpnName: service.msgVpnName,
          publishExceptionTopic: exception,
          topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
        };
        try {
          var getResponse = await AllService.getMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfilePublishException.topicSyntax.SMF, encodeURIComponent(exception));
          L.info("ACL Looked up");
        } catch (e) {
          L.info(`addPublishTopicExceptions lookup  failed ${e}`);
          try {
            let response = await AllService.createMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
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
      var sempV2Client = this.getSEMPv2Client(service);
      for (var exception of exceptions) {
        var aclException: MsgVpnAclProfileSubscribeException = {
          aclProfileName: app.credentials.secret.consumerKey,
          msgVpnName: service.msgVpnName,
          subscribeExceptionTopic: exception,
          topicSyntax: MsgVpnAclProfileSubscribeException.topicSyntax.SMF
        };
        try {
          var getResponse = await AllService.getMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfileSubscribeException.topicSyntax.SMF, encodeURIComponent(exception));
          L.debug("addSubscribeTopicExceptions: exception exists");
        } catch (e) {
          L.warn(`addSubscribeTopicExceptions lookup  failed ${JSON.stringify(e)}`);
          try {
            let response = await AllService.createMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
            L.debug("created SubscribeException");
          } catch (err) {
            L.error(`addSubscribeTopicExceptions add failed ${err}`);
            throw err;
          }

        }
      }
    }
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

  private getRDPSubscriptionsFromAsyncAPIs(apis: string[]): Promise<string[]> {
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
                  if (channel.hasPublish() && (channel.publish().hasBinding('http') || channel.publish().hasBinding('https'))) {
                    L.info(`getRDPSubscriptionsFromAsyncAPIs subscribe ${s}`)
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

  public getMessagingProtocols(app: App): Promise<AppEnvironment[]> {

    return new Promise<AppEnvironment[]>((resolve, reject) => {
      const appEnvironments: AppEnvironment[] = [];

      const apiProductPromises: Promise<APIProduct>[] = [];
      app.apiProducts.forEach((productName: string) => {
        L.info(productName);
        apiProductPromises.push(ApiProductsService.byName(productName));
      });

      Promise.all(apiProductPromises)
        .then(async (products: APIProduct[]) => {
          try {
            for (const product of products) {
              L.info(`getMessagingProtocols ${product.name}`);
              for (const envName of product.environments) {
                let appEnv = appEnvironments.find((ae) => ae.name == envName);
                if (appEnv === undefined) {
                  appEnv = {
                    name: envName,
                  };
                  appEnvironments.push(appEnv);
                }
                const service = await this.getServiceByEnv(envName);
                const endpoints: Endpoint[] = [];
                for (const protocol of product.protocols) {
                  L.info(`getMessagingProtocols ${protocol.name}`);
                  const keys = ProtocolMapper.findByAsyncAPIProtocol(protocol)
                    .protocolKeys;
                  L.info(`getMessagingProtocols ${keys.name} ${keys.protocol}`);
                  const endpoint = service.messagingProtocols
                    .find((mp) => mp.name == keys.name)
                    .endPoints.find((ep) => ep.transport == keys.protocol);
                  //L.info(endpoint);
                  let newEndpoint: Endpoint = endpoints.find(
                    (ep) => ep.uri == endpoint.uris[0]
                  );
                  //L.info(newEndpoint);
                  if (newEndpoint === undefined) {
                    newEndpoint = {
                      compressed: endpoint.compressed == 'yes' ? 'yes' : 'no',
                      secure: endpoint.secured == 'yes' ? 'yes' : 'no',
                      protocol: protocol,
                      transport: endpoint.transport,
                      uri: endpoint.uris[0],
                    };
                    endpoints.push(newEndpoint);
                  }
                }
                appEnv.messagingProtocols = endpoints;
              }
            }
            resolve(appEnvironments);
          } catch (error) {
            reject(error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private getBindingsFromAsyncAPIs(apis: string[]): Promise<string[]> {
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
                  var bindingProtocols: string[] = [];
                  if (channel.hasSubscribe()) {
                    bindingProtocols = bindingProtocols.concat(channel.getSubscribe().bindingProtocols());

                  }
                  if (channel.hasPublish()) {
                    bindingProtocols = bindingProtocols.concat(channel.getPublish().bindingProtocols());
                  }
                  resources = resources.concat(bindingProtocols);
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

  private getResources(resources: string[]): string[] {
    var returnResources: string[] = [];
    resources.forEach((resource: string) => returnResources.push(resource));
    L.info(returnResources);
    return returnResources;
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

  private getSEMPv2Client(service: Service): Sempv2Client {
    var sempProtocol = service.managementProtocols.find(i => i.name === "SEMP");
    ns.getStore().set(Sempv2Client.BASE, sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0]);
    ns.getStore().set(Sempv2Client.USER, sempProtocol.username);
    ns.getStore().set(Sempv2Client.PASSWORD, sempProtocol.password);

    return Sempv2Client;
  }
}
export default new BrokerService();
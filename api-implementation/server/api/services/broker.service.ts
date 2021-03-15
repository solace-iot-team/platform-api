import L from '../../common/logger';

import App = Components.Schemas.App;
import Developer = Components.Schemas.Developer;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import Permissions = Components.Schemas.Permissions;
import Endpoint = Components.Schemas.Endpoint;
import AppEnvironment = Components.Schemas.AppEnvironment;
import WebHook = Components.Schemas.WebHook;

import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';

import { ProtocolMapper } from '../../../src/protocolmapper';

import EnvironmentsService from './environments.service';
import { Service } from '../../../src/clients/solacecloud';
import {
  AllService, MsgVpnClientUsername,
  MsgVpnAclProfile,
  MsgVpnAclProfileResponse,
  MsgVpnAclProfilePublishException,
  MsgVpnAclProfileSubscribeException,
  MsgVpnQueue,
  MsgVpnQueueSubscription,
  MsgVpnRestDeliveryPoint,
  MsgVpnRestDeliveryPointRestConsumer,
  MsgVpnRestDeliveryPointQueueBinding
} from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { Sempv2Client } from '../../../src/sempv2-client';

import parser from '@asyncapi/parser';

import { ErrorResponseInternal } from '../middlewares/error.handler';

enum Direction {
  Publish = 'Publish',
  Subscribe = 'Subscribe',
}

class BrokerService {
  async getPermissions(app: App, developer: Developer, envName: string): Promise<Permissions> {
    const products: APIProduct[] = [];
    try {
      for (const productName of app.apiProducts) {
        const product = await ApiProductsService.byName(productName);
        products.push(product);
      }
      var permissions: Permissions = await this.getClientACLExceptions(app, products, developer, envName);
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
            var c = await this.createClientACLExceptions(app, services, products, developer);
            L.info(`created acl exceptions ${app.name}`);
            // no webhook - no RDP
            L.info(app.webHooks);
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

  deprovisionApp(app: App) {
    return new Promise<void>((resolve, reject) => {
      var environmentNames: string[] = [];

      var apiProductPromises: Promise<APIProduct>[] = [];
      app.apiProducts.forEach((productName: string) => {
        L.info(productName);
        apiProductPromises.push(ApiProductsService.byName(productName));
      });

      Promise.all(apiProductPromises).then(async (products: APIProduct[]) => {
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
          await this.deleteACLs(app, services);
          await this.deleteRDPs(app, services);
          await this.deleteQueues(app, services);
          resolve();
        } catch (e) {
          L.error('De-Provisioninig error');
          reject(new ErrorResponseInternal(500, e));
        }
      });
    });
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

  private deleteACLs(app: App, services: Service[]) {
    return new Promise<void>(async (resolve, reject) => {
      for (var service of services) {
        var sempv2Client = this.getSEMPv2Client(service);
        try {
          var getResponse = await AllService.deleteMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
          L.info("ACL deleted");
        } catch (e) {
          if (!(e.body.meta.error.status == "NOT_FOUND")) {
            reject(e);
          }
        }
      };
      resolve();
    });
  }

  private deleteQueues(app: App, services: Service[]) {
    return new Promise<void>(async (resolve, reject) => {
      for (var service of services) {
        var sempv2Client = this.getSEMPv2Client(service);
        try {
          var getResponse = await AllService.deleteMsgVpnQueue(service.msgVpnName, app.credentials.secret.consumerKey);
          L.info('Queue deleted');
        } catch (e) {
          if (!(e.body.meta.error.status == "NOT_FOUND")) {
            reject(e);
          }

        }
      };
      resolve();
    });
  }

  private deleteRDPs(app: App, services: Service[]) {
    return new Promise<void>(async (resolve, reject) => {
      for (var service of services) {
        var sempv2Client = this.getSEMPv2Client(service);
        try {
          var getResponse = await AllService.deleteMsgVpnRestDeliveryPoint(service.msgVpnName, app.credentials.secret.consumerKey);
          L.info("RDP deleted");
        } catch (e) {
          if (!(e.body.meta.error.status == "NOT_FOUND"))
            reject(e);
        }

        resolve();
      }
    });
  }
  private createClientUsernames(app: App, services: Service[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
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
            reject(e);
          }
        }
      }
      resolve();
    });
  }

  private deleteClientUsernames(app: App, services: Service[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
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
          var getResponse = await AllService.deleteMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
        } catch (e) {
          if (!(e.body.meta.error.status == "NOT_FOUND")) {
            reject(e);
          }
        }
      }
      resolve();
    });
  }
  private createClientACLExceptions(app: App, services: Service[], apiProducts: APIProduct[], developer: Developer): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
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
        resolve();
      } catch (e) {


        reject(new ErrorResponseInternal(400, e));
      }
    });
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

  private createRDP(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
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
        resolve();
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
          reject(new ErrorResponseInternal(400, msg))
          return;
        }
        var webHook = webHooks[0];
        try {
          rdpUrl = new URL(webHook.uri);
        } catch (e) {
          reject(new ErrorResponseInternal(400, "Webhook URL not provided or invalid"));
          return;
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
            reject(e);
            return;
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
            reject(e);
            return;
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
            reject(e);
            return;
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
          reject(new ErrorResponseInternal(500, e));
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
        }

      }
      resolve();
    });
  }


  private createQueues(app: App, services: Service[], apiProducts: APIProduct[], developer: Developer): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
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
        resolve();
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
            reject(e);
            return;
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
              reject(e);
              return;
            }
          }


        }



      }
      resolve();
    });
  }

  public getClientACLExceptions(app: App, apiProducts: APIProduct[], developer: Developer, envName: string): Promise<Permissions> {
    return new Promise<Permissions>(async (resolve, reject) => {

      var publishExceptions: string[] = [];
      var subscribeExceptions: string[] = [];
      // compile list of event destinations sub / pub separately
      for (var product of apiProducts) {
        for (var env of product.environments) {
          if (env == envName) {
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
        }
      }
      var attributes: any[] = this.getAttributes(app, developer, apiProducts);
      subscribeExceptions = this.enrichTopics(subscribeExceptions, attributes);
      publishExceptions = this.enrichTopics(publishExceptions, attributes);
      publishExceptions.forEach((s, index, arr) => {
        arr[index] = this.scrubDestination(s);
      });
      subscribeExceptions.forEach((s, index, arr) => {
        arr[index] = this.scrubDestination(s);
      });

      //L.debug(publishExceptions);
      //L.debug(subscribeExceptions);
      // reverse - Async API usage of verbs
      var permissions: Permissions = {
        publish: subscribeExceptions,
        subscribe: publishExceptions
      }
      resolve(permissions);
    });
  }


  private addPublishTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      for (var service of services) {
        var sempV2Client = this.getSEMPv2Client(service);
        for (var exception of exceptions) {
          var aclException: MsgVpnAclProfilePublishException = {
            aclProfileName: app.credentials.secret.consumerKey,
            msgVpnName: service.msgVpnName,
            publishExceptionTopic: exception,
            topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
          };
          //L.debug("createMsgVpnAclProfilePublishException");
          //L.debug(aclException);
          try {

            var getResponse = await AllService.getMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfilePublishException.topicSyntax.SMF, encodeURIComponent(exception));
            L.info("ACL Looked up");
          } catch (e) {
            L.info(`addPublishTopicExceptions lookup  failed ${e}`);
            try {
              let response = await AllService.createMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
              L.info("created  PublishException");
            } catch (e) {
              L.info(`addPublishTopicExceptions add failed ${e}`);
              reject(e);
            }
          }
        }

      }
      L.info("addPublishTopicExceptions resolved");
      resolve();
    });

  }
  private addSubscribeTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      for (var service of services) {
        var sempV2Client = this.getSEMPv2Client(service);
        for (var exception of exceptions) {
          var aclException: MsgVpnAclProfileSubscribeException = {
            aclProfileName: app.credentials.secret.consumerKey,
            msgVpnName: service.msgVpnName,
            subscribeExceptionTopic: exception,
            topicSyntax: MsgVpnAclProfileSubscribeException.topicSyntax.SMF
          };
          //L.debug("createMsgVpnAclProfileSubscribeException");
          //L.debug(aclException);
          try {
            var getResponse = await AllService.getMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfileSubscribeException.topicSyntax.SMF, encodeURIComponent(exception));
            L.info("addSubscribeTopicExceptions: exception exists");
          } catch (e) {
            L.warn(`addSubscribeTopicExceptions lookup  failed ${JSON.stringify(e)}`);
            try {
              let response = await AllService.createMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
              //L.debug("created  SubscribeException");
            } catch (e) {
              L.error(`addSubscribeTopicExceptions add failed ${e}`);
              reject(e);
            }

          }
        }

      }
      resolve();
    });

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
                    //L.debug(`Subscribe ${s}`)
                    resources.push(s);
                  }
                  if (direction == Direction.Publish && channel.hasPublish()) {
                    //L.debug(`Publish ${s}`)
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
                  if (channel.hasPublishj() && (channel.publish().hasBinding('http') || channel.publish().hasBinding('https'))) {
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
                  L.info(endpoint);
                  let newEndpoint: Endpoint = endpoints.find(
                    (ep) => ep.uri == endpoint.uris[0]
                  );
                  L.info(newEndpoint);
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

  private scrubDestination(destination: string) {
    return destination.replace(/\{[^\/]*\}(?!$)/g, "*").replace(/\{[^\/]*\}$/, ">");
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
    var sempv2Client = new Sempv2Client(sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0],
      sempProtocol.username,
      sempProtocol.password);
    return sempv2Client;
  }




}
export default new BrokerService();
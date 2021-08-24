import L from '../../common/logger';

import App = Components.Schemas.App;
import Developer = Components.Schemas.Developer;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import Attributes = Components.Schemas.Attributes;
import Permissions = Components.Schemas.Permissions;
import Endpoint = Components.Schemas.Endpoint;
import AppEnvironment = Components.Schemas.AppEnvironment;
import WebHook = Components.Schemas.WebHook;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;

import ApiProductsService from './apiProducts.service';
import ACLManager from './broker/aclmanager';


import { ProtocolMapper } from '../../../src/protocolmapper';

import EnvironmentsService from './environments.service';
import { Service } from '../../../src/clients/solacecloud';
import {
  AllService, MsgVpnClientUsername,
  MsgVpnQueue,
  MsgVpnQueueSubscription,
  MsgVpnRestDeliveryPoint,
  MsgVpnRestDeliveryPointRestConsumer,
  MsgVpnRestDeliveryPointQueueBinding,
} from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import SempV2ClientFactory from './broker/sempv2clientfactory';

import { ErrorResponseInternal } from '../middlewares/error.handler';

class BrokerService {
  async getPermissions(app: App, ownerAttributes: Attributes, envName: string, syntax: TopicSyntax): Promise<Permissions> {
    const products: APIProduct[] = [];
    try {
      for (const productName of app.apiProducts) {
        const product = await ApiProductsService.byName(productName);
        products.push(product);
      }
      var permissions: Permissions = await ACLManager.getClientACLExceptions(app, products, ownerAttributes, envName, syntax);
      return permissions;
    } catch (err) {
      L.error("Get permissions error");
      throw new ErrorResponseInternal(500, err);
    }
  }

  async provisionApp(app: App, ownerAttributes: Attributes, isUpdate?: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      var apiProductPromises: Promise<APIProduct>[] = [];
      app.apiProducts.forEach((productName: string) => {
        L.info(productName);
        apiProductPromises.push(ApiProductsService.byName(productName));
      });

      Promise.all(apiProductPromises).then(async (productResults: APIProduct[]) => {
        L.info(`API Products looked up, processing provisioning`);
        L.debug(productResults);
        try {

          for (var product of productResults) {
            var environmentNames: string[] = [];
            product.environments.forEach((e: string) => {
              environmentNames.push(e);
            })
            L.info(`env: ${product.environments}`);
            const products: APIProduct[] = [];
            products.push(product);
            environmentNames = Array.from(new Set(environmentNames));
            L.info(`provisioning product ${product.name} to ${JSON.stringify(environmentNames)}`);
            await this.doProvision(app, environmentNames, products, ownerAttributes);

          }
          if ((!productResults || productResults.length == 0) && isUpdate) {
            L.info(`No API Products present, updating Broker`);
            const environmentNames = await this.getEnvironments(app);
            const products: APIProduct[] = [];
            await this.doProvision(app, environmentNames, products, ownerAttributes);
          } else {
            L.info(`No API Products present, do nothing`);
          }

          resolve();
        } catch (e) {
          L.error(`Provisioning error ${e}`);
          L.error(e.stack);
          try {
            await this.deprovisionApp(app);
          } catch (e) {
            // things may go wrong here, that's fine. we are just trying to clean up
          }
          reject(new ErrorResponseInternal(500, e));
        }
      });
    });
  }
  private async doProvision(app: App, environmentNames: string[], products: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    const services = await this.getServices(environmentNames);
    var a = await ACLManager.createACLs(app, services);
    L.info(`created acl profile ${app.name}`);
    var b = await this.createClientUsernames(app, services);
    L.info(`created client username ${app.name}`);
    var e = await ACLManager.createAuthorizationGroups(app, services);
    L.info(`created client username ${app.name}`);
    var c = await ACLManager.createClientACLExceptions(app, services, products, ownerAttributes);
    L.info(`created acl exceptions ${app.name}`);
    // no webhook - no RDP
    //L.info(app.webHooks);
    if (app.webHooks != null && app.webHooks.length > 0) {
      L.info("creating webhook");
      var d = await this.createQueues(app, services, products, ownerAttributes);
      L.info(`created queues ${app.name}`);
      var d = await this.createRDP(app, services, products);
      L.info(`created rdps ${app.name}`);
    }
  }

  async deprovisionApp(app: App) {
    var environmentNames: string[] = [];

    environmentNames = await this.getEnvironments(app);

    try {
      const services = await this.getServices(environmentNames);
      await this.deleteClientUsernames(app, services);
      await ACLManager.deleteAuthorizationGroups(app, services);
      await ACLManager.deleteACLs(app, services);
      await this.deleteRDPs(app, services);
      await this.deleteQueues(app, services);
    } catch (err) {
      L.error('De-Provisioninig error');
      L.error(err);
      throw new ErrorResponseInternal(500, err.message);
    }
  }

  private async getServices(environmentNames: string[]): Promise<Service[]> {
    try {
      L.info(`all-env: ${environmentNames}`);
      const returnServices: Service[] = [];
      for (const envName of environmentNames) {
        L.info(envName);
        const env: Environment = (await EnvironmentsService.byName(envName) as any) as Environment;
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
      const env = await EnvironmentsService.byName(envName) as any as Environment;
      L.info(env.serviceId);
      const service = await SolaceCloudFacade.getServiceByEnvironment(env);
      return service;
    } catch (err) {
      L.error(`getServiceByEnv - ${JSON.stringify(err)}`);
      throw err;
    }
  }

  private async deleteQueues(app: App, services: Service[]) {
    for (var service of services) {
      var sempv2Client = SempV2ClientFactory.getSEMPv2Client(service);
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
      var sempv2Client = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        var getResponse = await AllService.deleteMsgVpnRestDeliveryPoint(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("RDP deleted");
      } catch (e) {
        if (!(e.body.meta.error.status == "NOT_FOUND"))
          throw e;
      }
    }
  }


  private async createClientUsernames(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
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
      const sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const getResponse = await AllService.deleteMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
      } catch (err) {
        L.error(err);
        if (err.body && err.body.meta && !(err.body.meta.error.status == "NOT_FOUND")) {
          throw err;
        }
      }
    }
  }

  private async getEnvironments(app: App): Promise<string[]> {
    var environmentNames: string[] = [];
    for (const productName of app.apiProducts) {
      let product = await ApiProductsService.byName(productName);
      environmentNames = environmentNames.concat(product.environments);

    }
    // if there are no API Products we need to find other references to environments in webhooks and finally fall back on all environments in the org
    if (environmentNames.length == 0) {
      for (const webHook of app.webHooks) {
        environmentNames = environmentNames.concat(webHook.environments);
      }
    }
    if (environmentNames.length == 0) {
      let envs = await EnvironmentsService.all()
      for (const env of envs) {
        environmentNames = environmentNames.concat(env.name);
      }
    }
    L.debug(`envs:`);
    L.debug(Array.from(new Set(environmentNames)));
    return Array.from(new Set(environmentNames));
  }

  private async createRDP(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
    L.info(`createRDP services: ${services}`);
    var subscribeExceptions: string[] = [];
    var useTls: boolean = false;
    for (var product of apiProducts) {
      var strs: string[] = await ACLManager.getRDPSubscriptionsFromAsyncAPIs(product.apis);
      for (var s of strs) {
        subscribeExceptions.push(s);
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
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
        L.debug(`createRDP consumer enablement  failed ${JSON.stringify(e)}`);
        throw new ErrorResponseInternal(500, e);
      }
    }
  }


  private async createQueues(app: App, services: Service[], apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    L.info(`createQueueSubscriptions services: ${services}`);
    var subscribeExceptions: string[] = await ACLManager.getRDPQueueSubscriptions(app, apiProducts, ownerAttributes);
    if (subscribeExceptions === undefined) {
      subscribeExceptions = [];
    }
    // loop over services
    for (var service of services) {
      //create queues
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
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
      } catch (e) {
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
        } catch (e) {
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
}
export default new BrokerService();
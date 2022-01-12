import L from '../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import Attributes = Components.Schemas.Attributes;
import Permissions = Components.Schemas.Permissions;
import Endpoint = Components.Schemas.Endpoint;
import AppEnvironment = Components.Schemas.AppEnvironment;
import WebHook = Components.Schemas.WebHook;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import EnvironmentResponse = Components.Schemas.EnvironmentResponse;
import ClientOptions = Components.Schemas.ClientOptions;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;

import ApiProductsService from './apiProducts.service';
import ACLManager from './broker/aclmanager';
import QueueManager from './broker/queuemanager';
import BrokerUtils from './broker/brokerutils';
import StatusService from './broker/statusservice';

import { ProtocolMapper } from '../../../src/protocolmapper';

import EnvironmentsService from './environments.service';
import { Service } from '../../../src/clients/solacecloud';
import {
  AllService, MsgVpnClientUsername,
  MsgVpnRestDeliveryPoint,
  MsgVpnRestDeliveryPointRestConsumer,
  MsgVpnRestDeliveryPointQueueBinding,
  MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName,
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

  async reProvisionApp(appPatch: App, appUnmodified: App, ownerAttributes: Attributes): Promise<boolean> {
    // check if credentials were changed. this triggers a nem change of broker resources such as client name, password
    let areCredentialsUpdated: boolean = false;
    if (appPatch.credentials && appPatch.credentials.secret.consumerKey != appUnmodified.credentials.secret.consumerKey) {
      areCredentialsUpdated = true;
    }
    // credentials change triggers a deprovision action. Too drastic as credentioals change merely impact the client username
    if (areCredentialsUpdated) {
      let services = await BrokerUtils.getServicesByApp(appUnmodified);
      const r = await this.deleteClientUsernames(appUnmodified, services);
      services = await BrokerUtils.getServicesByApp(appPatch);
      await this.createClientUsernames(appPatch, services);
    }
    L.info(`provisioning app ${appPatch.name}`);
    // try to provision the modified app, if it fails roll back to previous version and provision the previous version
    try {
      const r = await this.provisionApp(appPatch as App, ownerAttributes, true);
      return true;
    }
    catch (e) {
      const r = await this.provisionApp(appUnmodified as App, ownerAttributes, true);
      return false;
    }

  }
  async provisionApp(app: App, ownerAttributes: Attributes, isUpdate?: boolean): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (await this.provisionedByConsumerKey(app)) {
        await this.doDeprovisionApp(app, app.credentials.secret.consumerKey);
      }
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
            const environmentNames = await BrokerUtils.getEnvironments(app);
            const products: APIProduct[] = [];
            await this.doProvision(app, environmentNames, products, ownerAttributes);
          } else {
            L.debug(`No update requested or no API Products present.`);
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
    const services = await BrokerUtils.getServices(environmentNames);
    var a = await ACLManager.createACLs(app, services);
    L.info(`created acl profile ${app.name}`);
    var b = await this.createClientUsernames(app, services);
    L.info(`created client username ${app.name}`);
    var e = await ACLManager.createAuthorizationGroups(app, services);
    L.info(`created client username ${app.name}`);
    var c = await ACLManager.createClientACLExceptions(app, services, products, ownerAttributes);
    L.info(`created acl exceptions ${app.name}`);

    // provision queue if webhooks are configured
    if (app.webHooks != null && app.webHooks.length > 0) {
      L.info("creating webhook queues");
      var d = await QueueManager.createWebHookQueues(app, services, products, ownerAttributes);
      L.info(`created webhook queues ${app.name}`);
    } else {
      // clean up queues
      await QueueManager.deleteWebHookQueues(app, services, app.internalName);
    }
    await QueueManager.createAPIProductQueues(app, services, products, ownerAttributes);
    // no webhook - no RDP
    //L.info(app.webHooks);    
    if (app.webHooks != null && app.webHooks.length > 0) {
      L.info("creating webhook");
      var d = await this.createRDP(app, services, products);
      L.info(`created rdps ${app.name}`);
    } else {
      // clean up RDPs
      await this.deleteRDPs(app, services, app.internalName);
    }
  }

  async deprovisionApp(app: App) {
    await this.doDeprovisionApp(app, app.internalName);
  }

  async getAppStatus(app: App): Promise<AppConnectionStatus> {
    return await StatusService.getAppStatus(app);
  }

  private async doDeprovisionApp(app: App, objectName: string) {
    var environmentNames: string[] = [];

    environmentNames = await BrokerUtils.getEnvironments(app);

    try {
      const services = await BrokerUtils.getServices(environmentNames);
      await this.deleteClientUsernames(app, services);
      await ACLManager.deleteAuthorizationGroups(app, services, objectName);
      await ACLManager.deleteACLs(app, services, objectName);
      await this.deleteRDPs(app, services, objectName);
      await QueueManager.deleteWebHookQueues(app, services, objectName);
      await QueueManager.deleteAPIProductQueues(app, services, objectName);

    } catch (err) {
      L.error(`De-Provisioninig error ${err.message}`);
      L.error(err.body);
      throw new ErrorResponseInternal(500, err.message);
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

  private async deleteRDPs(app: App, services: Service[], name: string) {
    for (var service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        var delResponse = await apiClient.deleteMsgVpnRestDeliveryPoint(service.msgVpnName, name);
        L.info("RDP deleted");
      } catch (e) {
        if (e.body.meta.error.status != "NOT_FOUND") {
          L.error('deleteRDPs');
          L.error(e);
          throw e;
        }
      }
    }
  }


  private async createClientUsernames(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      var clientUsername: MsgVpnClientUsername = {
        aclProfileName: app.internalName,
        clientUsername: app.credentials.secret.consumerKey,
        password: app.credentials.secret.consumerSecret,
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        enabled: true
      };
      try {
        var getResponse = await apiClient.getMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("Client Username Looked up");
        var responseUpd = await apiClient.updateMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey, clientUsername);
        L.info("Client Username updated");
      } catch (e) {

        try {
          let response = await apiClient.createMsgVpnClientUsername(service.msgVpnName, clientUsername);
          L.info("created  Client Username");
        } catch (e) {
          throw e;
        }
      }
    }
  }


  private async deleteClientUsernames(app: App, services: Service[]): Promise<void> {
    for (var service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const getResponse = await apiClient.deleteMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
      } catch (err) {
        if (err.body && err.body.meta && !(err.body.meta.error.status == "NOT_FOUND")) {
          L.error('deleteClientUsernames');
          L.error(err);
          throw err;
        }
      }
    }
  }

  private async createRDP(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
    // delete any existing RDPs - this should lead to short service interruption but no message loss 
    // as the underlying queue is not affected
    this.deleteRDPs(app, services, app.internalName);

    L.info(`createRDP services: ${services}`);
    var subscribeExceptions: string[] = [];
    var useTls: boolean = false;
    for (var product of apiProducts) {
      var strs: string[] = await ACLManager.getSubscriptionsFromAsyncAPIs(product.apis);
      for (var s of strs) {
        subscribeExceptions.push(s);
      }
    }
    if (subscribeExceptions.length < 1) {
      return;
    }
    const objectName: string = app.internalName;
    // loop over services
    for (var service of services) {
      var restConsumerName = `Consumer`;
      var rdpUrl: URL;
      var webHooks: WebHook[] = [];
      webHooks = app.webHooks.filter(w => w.environments == null || w.environments.find(e => e == service['environment']));
      if (webHooks.length > 1) {
        var msg: string = `Invalid webhook configuration for ${service['environment']}, found ${webHooks.length} matching configurations`;
        L.warn(msg);
        throw new ErrorResponseInternal(400, msg);
      } else if (webHooks.length == 0) {
        L.info(`no webhook to provision for service ${service.name} (${service['environment']})`);
        return;
      }
      var webHook = webHooks[0];
      try {
        L.debug(`webhook.uri ${webHook.uri}`);
        rdpUrl = new URL(webHook.uri);
      } catch (e) {
        L.error(e);
        throw new ErrorResponseInternal(400, `webhook URL not provided or invalid ${JSON.stringify(webHook)}`);
      }
      L.info(`webhook ${webHook.uri} provision for service ${service.name} (${service['environment']})`);

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
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      var newRDP: MsgVpnRestDeliveryPoint = {
        clientProfileName: "default",
        msgVpnName: service.msgVpnName,
        restDeliveryPointName: objectName,
        enabled: false
      };
      try {
        var q = await apiClient.getMsgVpnRestDeliveryPoint(service.msgVpnName, objectName);
        var updateResponse = await apiClient.updateMsgVpnRestDeliveryPoint(service.msgVpnName,
          objectName, newRDP);
        L.debug(`createRDP updated ${objectName}`);
      } catch (e) {
        L.debug(`createRDP lookup  failed ${JSON.stringify(e)}`);
        try {
          var q = await apiClient.createMsgVpnRestDeliveryPoint(service.msgVpnName, newRDP);
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
        restDeliveryPointName: objectName,
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
        var r = await apiClient.getMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, restConsumerName);
        var updateResponseRDPConsumer = await apiClient.updateMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, restConsumerName, newRDPConsumer);
        L.debug(`createRDP consumer updated ${app.internalName}`);
      } catch (e) {
        L.debug(`createRDP consumer lookup  failed ${JSON.stringify(e)}`);
        try {
          var r = await apiClient.createMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, newRDPConsumer);
        } catch (e) {
          L.warn(`createRDP consumer creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }
      }
      var newRDPQueueBinding: MsgVpnRestDeliveryPointQueueBinding = {
        msgVpnName: service.msgVpnName,
        restDeliveryPointName: objectName,
        postRequestTarget: `${rdpUrl.pathname}${rdpUrl.search}`,
        queueBindingName: objectName
      };
      try {
        var b = await apiClient.getMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, objectName, objectName);

        var updateResponseQueueBinding = await apiClient.updateMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, objectName, objectName, newRDPQueueBinding);
        L.debug(`createRDP queue binding updated ${app.internalName}`);
      } catch (e) {
        L.debug(`createRDP queue binding lookup  failed ${JSON.stringify(e)}`);
        try {
          var b = await apiClient.createMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, objectName, newRDPQueueBinding);
        } catch (e) {
          L.warn(`createRDP queue binding creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }
      }


      // add the trusted common names
      if (webHook.tlsOptions && webHook.tlsOptions.tlsTrustedCommonNames && webHook.tlsOptions.tlsTrustedCommonNames.length > 0) {
        for (var trustedCN of webHook.tlsOptions.tlsTrustedCommonNames) {
          const msgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName: MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName = {
            msgVpnName: service.msgVpnName,
            restConsumerName: restConsumerName,
            restDeliveryPointName: objectName,
            tlsTrustedCommonName: trustedCN,
          };
          try {
            await apiClient.createMsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName(service.msgVpnName, objectName, restConsumerName, msgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName);
          } catch (e) {
            L.warn(`add TLS Trusted CN failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e);
          }
        }
      }

      // enable the RDP
      try {
        var enableRDP: MsgVpnRestDeliveryPoint = {
          enabled: true
        }; var enableRDPResponse = await apiClient.updateMsgVpnRestDeliveryPoint(service.msgVpnName, objectName, enableRDP);
        L.debug(`createRDP enabled ${objectName}`);
      } catch (e) {
        L.error(`createRDP enable failed ${JSON.stringify(e)}`);
        throw new ErrorResponseInternal(500, e);
      }

      // enable the RDP consumer

      try {
        var enableRDPConsumer: MsgVpnRestDeliveryPointRestConsumer = {
          enabled: true
        };
        var updateResponseRDPConsumer = await apiClient.updateMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, restConsumerName, enableRDPConsumer);
        L.debug(`createRDP consumer enabled ${objectName}`);
      } catch (e) {
        L.debug(`createRDP consumer enablement  failed ${JSON.stringify(e)}`);
        throw new ErrorResponseInternal(500, e);
      }
    }
  }

  public async getMessagingProtocols(app: App): Promise<AppEnvironment[]> {
    const appEnvironments: AppEnvironment[] = [];
    const products: APIProduct[] = [];
    for (const productName of app.apiProducts) {
      L.info(productName);
      products.push(await ApiProductsService.byName(productName));
    };

    try {
      for (const product of products) {
        await this.processMessagingProtocolsInternal(product, appEnvironments);
      }
      return appEnvironments;
    } catch (error) {
      throw error;
    }
  }

  public async getMessagingProtocolsByAPIProduct(apiProduct: APIProduct): Promise<AppEnvironment[]> {
    const appEnvironments: AppEnvironment[] = [];
    try {
      await this.processMessagingProtocolsInternal(apiProduct, appEnvironments);
      return appEnvironments;
    } catch (error) {
      throw error;
    }
  }

  private async processMessagingProtocolsInternal(product: APIProduct, appEnvironments: AppEnvironment[]) {
    L.info(`getMessagingProtocols ${product.name}`);
    for (const envName of product.environments) {
      let appEnv = appEnvironments.find((ae) => ae.name == envName);
      if (appEnv === undefined) {
        const env: EnvironmentResponse = await EnvironmentsService.byName(envName);
        appEnv = {
          name: env.name,
          displayName: env.displayName ? env.displayName : env.name,
        };
        appEnvironments.push(appEnv);
      }
      const service = await this.getServiceByEnv(envName);
      const endpoints: Endpoint[] = [];
      if (product.protocols) {
        for (const protocol of product.protocols) {
          L.info(`getMessagingProtocols ${protocol.name}`);
          const keys = ProtocolMapper.findByAsyncAPIProtocol(protocol)
            .protocolKeys;
          L.info(`getMessagingProtocols ${keys.name} ${keys.protocol}`);
          const endpoint = service.messagingProtocols
            .find((mp) => mp.endPoints.find((ep) => ep.transport == keys.protocol && ep.name == keys.name))
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
      }
      appEnv.messagingProtocols = endpoints;
    }

  }

  clientOptionsRequireQueue(clientOptions: ClientOptions): boolean {
    L.debug(clientOptions);
    const requireQueue: boolean = (clientOptions != null
      && clientOptions.guaranteedMessaging != null
      && clientOptions.guaranteedMessaging.requireQueue == true);
    L.debug(`Provisioning Requires a queue - ${requireQueue}`)
    return requireQueue;
  }

  private async provisionedByConsumerKey(app: App): Promise<boolean> {
    const services: Service[] = await BrokerUtils.getServicesByApp(app);
    return await ACLManager.hasConsumerKeyACLs(app, services);
  }
}
export default new BrokerService();
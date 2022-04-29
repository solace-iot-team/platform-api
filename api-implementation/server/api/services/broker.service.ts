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
import MQTTSessionManager from './broker/mqttsessionmanager';
import BrokerUtils from './broker/brokerutils';
import StatusService from './broker/statusservice';
import ClientProfileManager from './broker/clientprofilemanager';

import { ProtocolMapper } from '../../../src/protocolmapper';

import EnvironmentsService from './environments.service';
import { Service } from '../../../src/clients/solacecloud/models/Service';
import {
  AllService, MsgVpnClientUsername,
  MsgVpnRestDeliveryPoint,
  MsgVpnRestDeliveryPointRestConsumer,
  MsgVpnRestDeliveryPointQueueBinding,
  MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName,
} from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import SempV2ClientFactory from './broker/sempv2clientfactory';
import APIProductsTypeHelper from '../../../src/apiproductstypehelper';
import { ErrorResponseInternal } from '../middlewares/error.handler';

class BrokerService {
  async getPermissions(app: App, ownerAttributes: Attributes, envName: string, syntax: TopicSyntax): Promise<Permissions> {
    const products: APIProduct[] = [];
    try {
      for (const apiProductReference of app.apiProducts) {
        const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
        const product = await ApiProductsService.byName(productName);
        products.push(product);
      }
      const permissions: Permissions = await ACLManager.getClientACLExceptions(app, products, ownerAttributes, envName, syntax);
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
      const products: APIProduct[] = [];
      for (const apiProductReference of appPatch.apiProducts) {
        const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
        if (productName && APIProductsTypeHelper.isApiProductReferenceApproved(apiProductReference)) {
          L.info(productName);
          products.push(await ApiProductsService.byName(productName));
        }
      };
      const clientProfileName: string = await ClientProfileManager.create(appPatch, services, products, ownerAttributes);
      await this.createClientUsernames(appPatch, services, clientProfileName);
    }
    // need to figure out if environments were removed and deprovision from these environments
    const oldServices: Service[] = await BrokerUtils.getServicesByApp(appUnmodified);
    const newServices: Service[] = await BrokerUtils.getServicesByApp(appPatch);
    const deProvisionServices = oldServices.filter(s => !newServices.includes(s));
    L.info(`updated app references less environments, deprovision from services ${JSON.stringify(deProvisionServices)}`)
    L.info(`provisioning app ${appPatch.name}`);
    if (deProvisionServices && deProvisionServices.length > 0) {
      await this.doDeprovisionAppByEnvironments(appUnmodified, appUnmodified.internalName, deProvisionServices);
    }

    // need to figure out if products were removed and if need to remove associated queues
    if (appPatch.apiProducts && appUnmodified.apiProducts) {
      const previousProductNames: string[] = APIProductsTypeHelper.apiProductReferencesToStringArray(appUnmodified.apiProducts);
      const newProductNames: string[] = APIProductsTypeHelper.apiProductReferencesToStringArray(appPatch.apiProducts);
      const diff: string[] = previousProductNames.filter(x => !newProductNames.includes(x));
      const tempApp: App = {
        internalName: appPatch.internalName,
        name: appPatch.name,
        apiProducts: diff,
        credentials: null,
      }
      QueueManager.deleteAPIProductQueues(tempApp, newServices, tempApp.internalName);
    }

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
      const apiProductPromises: Promise<APIProduct>[] = [];
      app.apiProducts.forEach((apiProductReference) => {
        const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
        if (productName && APIProductsTypeHelper.isApiProductReferenceApproved(apiProductReference)) {
          L.info(productName);
          apiProductPromises.push(ApiProductsService.byName(productName));
        }
      });

      Promise.all(apiProductPromises).then(async (productResults: APIProduct[]) => {
        L.info(`API Products looked up, processing provisioning`);
        L.debug(productResults);
        try {
          if (productResults && productResults.length > 0) {
            const products: APIProduct[] = [];
            let environmentNames: string[] = [];
            for (const product of productResults) {
              product.environments.forEach((e: string) => {
                environmentNames.push(e);
              })
              L.info(`env: ${JSON.stringify(product.environments)}`);
              products.push(product);
            }
            environmentNames = Array.from(new Set(environmentNames));
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
          if (e.body) {
            L.error(`Provisioning error ${e.message}, body ${JSON.stringify(e.body)}`);
          } else {
            L.error(`Provisioning error ${e}`);
          }

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

    const clientProfileName: string = await ClientProfileManager.create(app, services, products, ownerAttributes);
    L.info(`using client profile  ${clientProfileName}`);
    const a = await ACLManager.createACLs(app, services);
    L.info(`created acl profile ${app.name}`);
    const b = await this.createClientUsernames(app, services, clientProfileName);
    L.info(`created client username ${app.name}`);
    const e = await ACLManager.createAuthorizationGroups(app, services);
    L.info(`created client username ${app.name}`);
    const c = await ACLManager.createClientACLExceptions(app, products, ownerAttributes);
    L.info(`created acl exceptions ${app.name}`);

    // provision queue if webhooks are configured
    if (app.webHooks != null && app.webHooks.length > 0) {
      L.info("creating webhook queues");
      const d = await QueueManager.createWebHookQueues(app, services, products, ownerAttributes);
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
      const d = await this.createRDP(app, services, products);
      L.info(`created rdps ${app.name}`);
    } else {
      // clean up RDPs
      await this.deleteRDPs(app, services, app.internalName);
    }
    // set up the MQTT Session
    await MQTTSessionManager.create(app, services, products);
    L.info(`created mqtt session ${app.internalName}`);
  }

  async deprovisionApp(app: App) {
    await this.doDeprovisionApp(app, app.internalName);
  }

  async getAppStatus(app: App): Promise<AppConnectionStatus> {
    return await StatusService.getAppStatus(app);
  }

  private async doDeprovisionApp(app: App, objectName: string) {
    const environmentNames = await BrokerUtils.getEnvironments(app);

    try {
      const services = await BrokerUtils.getServices(environmentNames);
      await this.doDeprovisionAppByEnvironments(app, objectName, services);

    } catch (err) {
      L.error(`De-Provisioninig error ${err.message}`);
      L.error(err.body);
      throw new ErrorResponseInternal(500, err.message);
    }
  }
  private async doDeprovisionAppByEnvironments(app: App, objectName: string, services: Service[]) {
    try {
      await this.deleteClientUsernames(app, services);
      await ACLManager.deleteAuthorizationGroups(app, services, objectName);
      await ACLManager.deleteACLs(app, services, objectName);
      await this.deleteRDPs(app, services, objectName);
      await QueueManager.deleteWebHookQueues(app, services, objectName);
      await QueueManager.deleteAPIProductQueues(app, services, objectName);
      await MQTTSessionManager.delete(app, services);

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
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const delResponse = await apiClient.deleteMsgVpnRestDeliveryPoint(service.msgVpnName, name);
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


  private async createClientUsernames(app: App, services: Service[], clientProfileName: string): Promise<void> {
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      const clientUsername: MsgVpnClientUsername = {
        aclProfileName: app.internalName,
        clientUsername: app.credentials.secret.consumerKey,
        password: app.credentials.secret.consumerSecret,
        clientProfileName: clientProfileName,
        msgVpnName: service.msgVpnName,
        enabled: true
      };
      try {
        const getResponse = await apiClient.getMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
        L.info("Client Username Looked up");
        clientUsername.enabled = false;
        const responseUpd1 = await apiClient.updateMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey, clientUsername);
        clientUsername.enabled = true;
        const responseUpd2 = await apiClient.updateMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey, clientUsername);
        L.info("Client Username updated");
      } catch (e) {

        try {
          const response = await apiClient.createMsgVpnClientUsername(service.msgVpnName, clientUsername);
          L.info("created  Client Username");
        } catch (e) {
          throw e;
        }
      }
    }
  }


  private async deleteClientUsernames(app: App, services: Service[]): Promise<void> {
    for (const service of services) {
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
    await this.deleteRDPs(app, services, app.internalName);

    const subscribeExceptions: string[] = [];
    let useTls: boolean = false;
    for (const product of apiProducts) {
      const strs: string[] = await ACLManager.getSubscriptionsFromAsyncAPIs(product.apis);
      for (const s of strs) {
        subscribeExceptions.push(s);
      }
    }
    if (subscribeExceptions.length < 1) {
      return;
    }
    const objectName: string = app.internalName;
    // loop over services
    for (const service of services) {
      L.info(`createRDP for service: ${service.serviceId}`);
      const restConsumerName = `Consumer`;
      let rdpUrl: URL;
      let webHooks: WebHook[] = [];
      webHooks = app.webHooks.filter(w => w.environments == null || w.environments.find(e => e == service['environment']));
      if (webHooks.length > 1) {
        const msg: string = `Invalid webhook configuration for ${service['environment']}, found ${webHooks.length} matching configurations`;
        L.warn(msg);
        throw new ErrorResponseInternal(400, msg);
      } else if (webHooks.length == 0) {
        L.info(`no webhook to provision for service ${service.name} (${service['environment']})`);
      } else {
        let webHook = webHooks[0];
        L.info(`createRDP provisioning to service: ${service.serviceId}`);
        try {
          L.debug(`webhook.uri ${webHook.uri}`);
          rdpUrl = new URL(webHook.uri);
        } catch (e) {
          L.error(e);
          throw new ErrorResponseInternal(400, `webhook URL not provided or invalid ${JSON.stringify(webHook)}`);
        }
        L.info(`webhook ${webHook.uri} provision for service ${service.name} (${service['environment']})`);

        const protocol = rdpUrl.protocol.toUpperCase();
        let port = rdpUrl.port;
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
        const newRDP: MsgVpnRestDeliveryPoint = {
          clientProfileName: "default",
          msgVpnName: service.msgVpnName,
          restDeliveryPointName: objectName,
          enabled: false
        };
        try {
          const q = await apiClient.getMsgVpnRestDeliveryPoint(service.msgVpnName, objectName);
          const updateResponse = await apiClient.updateMsgVpnRestDeliveryPoint(service.msgVpnName,
            objectName, newRDP);
          L.debug(`createRDP updated ${objectName}`);
        } catch (e) {
          L.debug(`createRDP lookup  failed ${JSON.stringify(e)}`);
          try {
            const q = await apiClient.createMsgVpnRestDeliveryPoint(service.msgVpnName, newRDP);
          } catch (e) {
            L.warn(`createRDP creation  failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e);
          }
        }
        let authScheme = webHook.authentication && webHook.authentication['username'] ? MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.HTTP_BASIC : MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.NONE;
        if (authScheme == MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.NONE) {
          authScheme = webHook.authentication && webHook.authentication['headerName'] ? MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.HTTP_HEADER : MsgVpnRestDeliveryPointRestConsumer.authenticationScheme.NONE;
        }
        const method = webHook.method == 'PUT' ? MsgVpnRestDeliveryPointRestConsumer.httpMethod.PUT : MsgVpnRestDeliveryPointRestConsumer.httpMethod.POST;

        let connectionCount: number = 3;
        if (webHook.mode == 'serial') {
          connectionCount = 1;
        }
        const newRDPConsumer: MsgVpnRestDeliveryPointRestConsumer = {
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
          const r = await apiClient.getMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, restConsumerName);
          const updateResponseRDPConsumer = await apiClient.updateMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, restConsumerName, newRDPConsumer);
          L.debug(`createRDP consumer updated ${app.internalName}`);
        } catch (e) {
          L.debug(`createRDP consumer lookup  failed ${JSON.stringify(e)}`);
          try {
            const r = await apiClient.createMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, newRDPConsumer);
          } catch (e) {
            L.warn(`createRDP consumer creation  failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e);
          }
        }
        const newRDPQueueBinding: MsgVpnRestDeliveryPointQueueBinding = {
          msgVpnName: service.msgVpnName,
          restDeliveryPointName: objectName,
          postRequestTarget: `${rdpUrl.pathname}${rdpUrl.search}`,
          queueBindingName: objectName
        };
        try {
          const b = await apiClient.getMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, objectName, objectName);

          const updateResponseQueueBinding = await apiClient.updateMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, objectName, objectName, newRDPQueueBinding);
          L.debug(`createRDP queue binding updated ${app.internalName}`);
        } catch (e) {
          L.debug(`createRDP queue binding lookup  failed ${JSON.stringify(e)}`);
          try {
            const b = await apiClient.createMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, objectName, newRDPQueueBinding);
          } catch (e) {
            L.warn(`createRDP queue binding creation  failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e);
          }
        }


        // add the trusted common names
        if (webHook.tlsOptions && webHook.tlsOptions.tlsTrustedCommonNames && webHook.tlsOptions.tlsTrustedCommonNames.length > 0) {
          for (const trustedCN of webHook.tlsOptions.tlsTrustedCommonNames) {
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
          const enableRDP: MsgVpnRestDeliveryPoint = {
            enabled: true
          };
          const enableRDPResponse = await apiClient.updateMsgVpnRestDeliveryPoint(service.msgVpnName, objectName, enableRDP);
          L.debug(`createRDP enabled ${objectName}`);
        } catch (e) {
          L.error(`createRDP enable failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }

        // enable the RDP consumer

        try {
          const enableRDPConsumer: MsgVpnRestDeliveryPointRestConsumer = {
            enabled: true
          };
          const updateResponseRDPConsumer = await apiClient.updateMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, objectName, restConsumerName, enableRDPConsumer);
          L.debug(`createRDP consumer enabled ${objectName}`);
        } catch (e) {
          L.debug(`createRDP consumer enablement  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e);
        }
      }
    }
  }

  public async getMessagingProtocols(app: App): Promise<AppEnvironment[]> {
    const appEnvironments: AppEnvironment[] = [];
    const products: APIProduct[] = [];
    for (const apiProductReference of app.apiProducts) {
      const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
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
          const tmp = service.messagingProtocols
            .find((mp) => mp.endPoints.find((ep) => ep.transport == keys.protocol && ep.name == keys.name));
          const endpoint = tmp ? tmp.endPoints.find((ep) => ep.transport == keys.protocol) : null;
          let newEndpoint: Endpoint = endpoints.find(
            (ep) => (ep.uri == endpoint.uris[0] && ep.protocol.name == keys.name)
          );
          if (newEndpoint === undefined && endpoint) {
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
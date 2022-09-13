import L from '../../common/logger';

import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppApiProducts = Components.Schemas.AppApiProducts;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import Attributes = Components.Schemas.Attributes;
import Permissions = Components.Schemas.Permissions;
import Endpoint = Components.Schemas.Endpoint;
import AppEnvironment = Components.Schemas.AppEnvironment;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import EnvironmentResponse = Components.Schemas.EnvironmentResponse;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;
import SolaceConfigService from './solaceconfig.service'
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
import SolaceCloudFacade from '../../../src/solacecloudfacade';

import APIProductsTypeHelper from '../../../src/apiproductstypehelper';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import Broker from './broker.interface';
import MsgVpnClientProfile = Components.Schemas.MsgVpnClientProfile;
import AppConfigSet = Components.Schemas.AppConfigSet;
import clientusernameBuilder from './broker/clientusername.builder';
import restdeliverypointBuilder from './broker/restdeliverypoint.builder';

export class SolaceBrokerService implements Broker {
  public async getPermissions(app: App, ownerAttributes: Attributes, envName: string, syntax: TopicSyntax): Promise<Permissions> {
    try {
      const products: APIProduct[] = await this.getAPIProducts(app.apiProducts);
      const permissions: Permissions = await ACLManager.getClientACLExceptions(app, products, ownerAttributes, envName, syntax);
      return permissions;
    } catch (err) {
      L.error("Get permissions error");
      L.error(err);
      throw err;
    }
  }

  public async reprovision(appPatch: App, appUnmodified: App, ownerAttributes: Attributes): Promise<void> {
    L.debug(`Attempting to reprovision ${appPatch.name}`);
    if ((appPatch as AppPatch).status != 'approved') {
      L.debug(`App ${appPatch.name} is not approved`);
      return;
    }

    // try to provision the modified app, if it fails roll back to previous version and provision the previous version
    try {
      const r = await this.provision(appPatch as App, ownerAttributes, true);
    }
    catch (e) {
      L.error(`Error reprovisioning app `, e);
      L.error(e);
      const r = await this.provision(appUnmodified as App, ownerAttributes, true);
      throw e;
    }

  }
  public async provision(app: App, ownerAttributes: Attributes, isUpdate?: boolean): Promise<void> {
    const productResults: APIProduct[] = await this.getAPIProducts(app.apiProducts);
    L.info(`API Products looked up, processing provisioning`);
    L.trace(productResults);
    try {
      const products: APIProduct[] = [];
      let environmentNames: string[] = [];
      if (productResults && productResults.length > 0) {
        for (const product of productResults) {
          product.environments.forEach((e: string) => {
            environmentNames.push(e);
          })
          L.info(`env: ${JSON.stringify(product.environments)}`);
          products.push(product);
        }
      }
      environmentNames = Array.from(new Set(environmentNames));
      await this.doProvision(app, environmentNames, products, ownerAttributes);
    } catch (e) {
      if (e.body) {
        L.error(`Provisioning error ${e.message}, body ${JSON.stringify(e.body)}`);
      } else {
        L.error(`Provisioning error ${e}`);
      }
      L.error(e.stack);
      throw e;
    }

  }
  private async doProvision(app: App, environmentNames: string[], products: APIProduct[], ownerAttributes: Attributes): Promise<void> {

    const services = await BrokerUtils.getServices(environmentNames);

    const clientProfile: MsgVpnClientProfile = await ClientProfileManager.selectClientProfile(app, products, ownerAttributes);
    clientProfile.environments = environmentNames;
    const a = await ACLManager.createACLs(app, environmentNames);
    await ACLManager.createClientACLExceptions(app, products, ownerAttributes, a);
    const authzGroup = await ACLManager.createAuthorizationGroups(app, clientProfile.clientProfileName, environmentNames);
    const rdps = await restdeliverypointBuilder.build(app, services, products, ownerAttributes);
    let queues = await QueueManager.createAPIProductQueues(app, products, ownerAttributes);
    queues = queues.concat(await QueueManager.createAPIQueues(app, products, ownerAttributes));
    L.info(`created acl profile ${app.name}`);
    const appConfig: AppConfigSet = {
      aclProfile: a,
      authorizationGroup: authzGroup,
      clientProfile: clientProfile,
      displayName: app.displayName,
      clientUsername: await clientusernameBuilder.build(app, clientProfile.clientProfileName, environmentNames),
      name: app.name,
      services: [],
      tags: ['app', app.name, app.internalName],
      restDeliveryPoints: rdps,
      queues: queues,
      mqttSession: await MQTTSessionManager.create(app, products, environmentNames)
    };
    for (const service of services) {
      appConfig.services.push({
        environment: service['environment'],
        service: (service as Components.Schemas.Service)
      })
    }
    const result = await SolaceConfigService.apply(appConfig);
    L.debug(result);
    if (!result.applied) {
      throw new ErrorResponseInternal(500, `App ${app.name} could not be provisioned (${JSON.stringify(result.errors)})`);
    }
  }

  public async deprovision(app: App) {
    try {
      await SolaceConfigService.delete(app.name);
    } catch (e) {
      const err = e as ErrorResponseInternal;
      if (err.statusCode != 404) {
        throw e;
      }

    }
  }

  public async getAppStatus(app: App): Promise<AppConnectionStatus> {
    return await StatusService.getAppStatus(app);
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

  public async getMessagingProtocols(app: App): Promise<AppEnvironment[]> {
    const appEnvironments: AppEnvironment[] = [];
    const products: APIProduct[] = await this.getAPIProducts(app.apiProducts);
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
              msgVpn: service.msgVpnName
            };
            endpoints.push(newEndpoint);
          }
        }
      }
      appEnv.messagingProtocols = endpoints;
    }

  }

  private async getAPIProducts(apiProducts: AppApiProducts): Promise<APIProduct[]> {
    const products: APIProduct[] = [];

    for (const apiProductReference of apiProducts) {
      const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
      const product = await ApiProductsService.byReference(productName);
      if ((product.meta && (!product.meta.stage || product.meta.stage != 'retired')) &&
        APIProductsTypeHelper.isApiProductReferenceApproved(apiProductReference)) {
        products.push(product);
      }
    }
    return products;

  }
}

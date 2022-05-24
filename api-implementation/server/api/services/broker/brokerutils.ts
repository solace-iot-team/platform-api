import L from '../../../common/logger';

import Environment = Components.Schemas.Environment;
import EnvironmentResponse = Components.Schemas.EnvironmentResponse;
import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;
import ClientOptions = Components.Schemas.ClientOptions;
import { Service } from '../../../../src/clients/solacecloud/models/Service';

import EnvironmentsService from '../environments.service';
import ApiProductsService from '../apiProducts.service';

import SolaceCloudFacade from '../../../../src/solacecloudfacade';

import APIProductsTypeHelper from '../../../../src/apiproductstypehelper';

class BrokerUtils {

  async getEnvironments(app: App): Promise<string[]> {
    let environmentNames: string[] = [];
    for (const apiProductReference of app.apiProducts) {
      const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
      let product = await ApiProductsService.byReference(productName);
      environmentNames = environmentNames.concat(product.environments);

    }
    // if there are no API Products we need to find other references to environments in webhooks and finally fall back on all environments in the org
    if (environmentNames.length == 0 && app.webHooks) {
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

  async getEnvironmentObjects(app: App): Promise<EnvironmentResponse[]> {
    const environmentNames: string[] = await this.getEnvironments(app);
    const environments: EnvironmentResponse[] = [];
    for (const envName of environmentNames) {
      environments.push(await EnvironmentsService.byName(envName));
    }

    return environments;
  }

  async getServices(environmentNames: string[]): Promise<Service[]> {
    try {
      L.info(`all-env: ${environmentNames} ${environmentNames.length}`);
      const returnServices: Service[] = [];
      for (const envName of environmentNames) {
        L.info(`env-name: ${envName}`);
        if (envName) {
          const env: Environment = (await EnvironmentsService.byName(envName) as any) as Environment;
          L.info(env.serviceId);
          const service: Service = await SolaceCloudFacade.getServiceByEnvironment(
            env
          );
          service['environment'] = env.name;
          returnServices.push(service);
        }
      }
      return returnServices;
    } catch (err) {
      L.error(`getServices - ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async getServicesByApp(app: App): Promise<Service[]> {
    const envs: string[] = await this.getEnvironments(app);
    const services: Service[] = await this.getServices(envs);
    return services;
  }

  public isMQTTSessionRequired(apiProducts: APIProduct[]): boolean {
    if (!apiProducts || apiProducts.length == 0) {
      return false;
    }
    for (const apiProduct of apiProducts) {
      if (apiProduct.protocols) {
        if (apiProduct.protocols.filter(e => (
          e.name == 'mqtt' || e.name == 'secure-mqtt' ||
          e.name == 'ws-mqtt' || e.name == 'wss-mqtt')
        ).length >= 1) {
          L.debug(`api product ${apiProduct.name} uses MQTT`);
          if (apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging && apiProduct.clientOptions.guaranteedMessaging.requireQueue) {
            L.debug(`api product ${apiProduct.name} uses MQTT-QOS1`);
            return true;
          }
        } else {
          L.debug(`api product ${apiProduct.name} does NOT use MQTT`);
        }
      }
    }
    return false;
  }

  public getAppAggregatedClientOptions(apiProducts: APIProduct[]): ClientOptions {
    const clientOpts: ClientOptions = {
      guaranteedMessaging: {
        requireQueue: false,
        accessType: 'exclusive',
        maxMsgSpoolUsage: 0,
        maxTtl: 3600,
      }
    };
    for (const apiProduct of apiProducts) {
      if (apiProduct.clientOptions
        && apiProduct.clientOptions.guaranteedMessaging
        && apiProduct.clientOptions.guaranteedMessaging.requireQueue) {
        const gmOptions = apiProduct.clientOptions.guaranteedMessaging;
        clientOpts.guaranteedMessaging.requireQueue = gmOptions.requireQueue;
        clientOpts.guaranteedMessaging.maxMsgSpoolUsage = clientOpts.guaranteedMessaging.maxMsgSpoolUsage + gmOptions.maxMsgSpoolUsage;
        clientOpts.guaranteedMessaging.maxTtl = clientOpts.guaranteedMessaging.maxTtl > gmOptions.maxTtl ? clientOpts.guaranteedMessaging.maxTtl : gmOptions.maxTtl;
      }
    }
    if (clientOpts.guaranteedMessaging.maxMsgSpoolUsage > 0) {
      if (L.isLevelEnabled('debug'))
        L.debug(`combined client options ${JSON.stringify(clientOpts)}`);
      return clientOpts;
    } else {
      L.info(`no adequate client options could be derived`);
      return null;
    }
  }

}
export default new BrokerUtils();

import L from '../../../common/logger';

import Environment = Components.Schemas.Environment;
import App = Components.Schemas.App;
import { Service } from '../../../../src/clients/solacecloud';

import EnvironmentsService from '../environments.service';
import ApiProductsService from '../apiProducts.service';

import SolaceCloudFacade from '../../../../src/solacecloudfacade';

class BrokerUtils {

    async getEnvironments(app: App): Promise<string[]> {
    var environmentNames: string[] = [];
    for (const productName of app.apiProducts) {
      let product = await ApiProductsService.byName(productName);
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

  async getServicesByApp(app: App): Promise<Service[]>{
    const envs: string[] = await this.getEnvironments(app);
    const services: Service[] = await this.getServices(envs);
    return services;
  }
}
export default new BrokerUtils();
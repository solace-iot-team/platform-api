import L from '../../../common/logger';

import ApisService from '../apis.service';
import BrokerService from '../broker.service';
import { AsyncAPIServer } from '../../../../src/model/asyncapiserver';
import AsyncAPIHelper from '../../../../src/asyncapihelper';
import BindingsRegistry from './bindingsregistry';
import { BindingsGenerator } from './bindingsgenerator';
import ApiProductsService from '../apiProducts.service';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import AppEnvironment = Components.Schemas.AppEnvironment;
import { ErrorResponseInternal } from '../../middlewares/error.handler';

class AsyncApiGenerator {
  public async getSpecificationByApp(apiName: string, app: App): Promise<string> {
    const spec = await ApisService.byName(apiName);
    // parse the spec - try to treat as JSON, if fails treat as YAML
    let specModel = null;
    try {
      specModel = JSON.parse(spec);
    } catch (e) {
      specModel = JSON.parse(AsyncAPIHelper.YAMLtoJSON(spec));
    }
    specModel.servers = await this.getServers(app);
    specModel.components.securitySchemes = this.getSecuritySchemes();
    await this.processChannelBindings(apiName, app, specModel.channels);
    return JSON.stringify(specModel);

  }

  public async getSpecificationByApiProduct(apiName: string, apiProduct: APIProduct): Promise<string> {
    const spec = await ApisService.byName(apiName);
    // parse the spec - try to treat as JSON, if fails treat as YAML
    let specModel = null;
    try {
      specModel = JSON.parse(spec);
    } catch (e) {
      specModel = JSON.parse(AsyncAPIHelper.YAMLtoJSON(spec));
    }
    specModel.servers = await this.getServersByApiProduct(apiProduct);
    specModel.components.securitySchemes = this.getSecuritySchemes();
    await this.processApiProductChannelBindings(apiProduct, null, specModel.channels);
    return JSON.stringify(specModel);

  }

  private async getServers(app: App): Promise<any> {
    const envs: AppEnvironment[] = await BrokerService.getMessagingProtocols(app);
    return this.mapServers(envs);
  }

  private async getServersByApiProduct(apiProduct: APIProduct): Promise<any> {
    const envs: AppEnvironment[] = await BrokerService.getMessagingProtocolsByAPIProduct(apiProduct);
    return this.mapServers(envs);
  }

  private mapServers(envs: AppEnvironment[]): any {
    const servers = {};
    for (const env of envs) {
      for (const protocol of env.messagingProtocols) {
        const server: AsyncAPIServer = {
          protocol: protocol.protocol.name,
          protocolVersion: protocol.protocol.version,
          url: protocol.uri,
        };
        let serverKey: string = env.name;
        if (env.messagingProtocols.length > 1) {
          serverKey = `${env.name}-${protocol.protocol.name}`;
        }
        if (protocol.protocol.name.toUpperCase().startsWith('HTTP')) {
          server.security = [{ httpBasic: [] }];
        } else {
          server.security = [{ userPassword: [] }];
        }
        servers[serverKey] = server;
      }
    }
    return servers;
  }

  private getSecuritySchemes(): Promise<any> {
    const securitySchemes: any = {};
    securitySchemes.userPassword = {
      type: 'userPassword',
      description: 'Username Password',
    };
    securitySchemes.httpBasic = {
      type: 'http',
      description: 'HTTP Basic',
      scheme: 'basic',
    };
    return securitySchemes;
  }

  private async processChannelBindings(apiName: string, app: App, channels: any): Promise<any> {

    // get the relevant API product(s) from the app looking it up by the api
    const apiProducts: APIProduct[] = await this.findAPIProductsByAPIName(apiName, app);
    L.debug(`processChannelBindings found API Products ${apiProducts}`);
    for (const apiProduct of apiProducts) {
      await this.processApiProductChannelBindings(apiProduct, app, channels);
    }

  }

  private async processApiProductChannelBindings(apiProduct: APIProduct, app: App, channels: any) {
    if (apiProduct.protocols) {
      for (const protocol of apiProduct.protocols) {
        L.info(`processChannelBindings processing  ${apiProduct.name} protocol ${protocol.name}`);
        const generator: BindingsGenerator = BindingsRegistry.getGeneratorByProtocol(protocol);
        if (generator) {
          await generator.processChannels(channels, app, apiProduct);
        } else {
          L.warn(`No BindingsGenerator registered for ${protocol.name}`);
        }
      }

    }
  }

  private async findAPIProductsByAPIName(apiName: string, app: App): Promise<APIProduct[]> {
    let apiProducts: APIProduct[] = [];
    for (const productName of app.apiProducts) {
      const results = await ApiProductsService.all({ name: productName, apis: apiName });
      if (results.length > 1) {
        throw new ErrorResponseInternal(500, 'Found multiple matching documents for API Product Name');
      } else if (results.length == 1) {
        apiProducts = apiProducts.concat(results);
      }
    }
    L.debug(`findAPIProductsByAPIName returned products ${JSON.stringify(apiProducts)}`);
    return apiProducts;

  }
}

export default new AsyncApiGenerator();
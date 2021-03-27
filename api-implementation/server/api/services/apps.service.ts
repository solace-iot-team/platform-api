import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import DevelopersService from './developers.service';
import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';
import BrokerService from './broker.service';
import { PersistenceService } from './persistence.service';
import App = Components.Schemas.App;
import AppListItem = Components.Schemas.AppListItem;
import AppResponse = Components.Schemas.AppResponse;
import AppPatch = Components.Schemas.AppPatch;
import ApiProduct = Components.Schemas.APIProduct;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;

import AsyncAPIHelper from '../../../src/asyncapihelper';
import { AsyncAPIServer } from '../../../src/model/asyncapiserver';

export interface APISpecification {
  name: string;
  specification: string;
}

export class AppsService {
  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apps');
  }

  async all(): Promise<App[]> {
    return this.persistenceService.all();
  }

  async list(query: any): Promise<AppListItem[]> {
    const apps = await this.persistenceService.all(query);
    const appList: AppListItem[] = [];
    apps.forEach((app: AppResponse) => {
      const listItem: AppListItem = {
        name: app.name,
        apiProducts: app.apiProducts,
        appType: app['appType'],
        status: app.status,
        ownerId: app['ownerId'],
      };
      appList.push(listItem);
    });
    return appList;
  }

  async apiList(appName: string): Promise<string[]> {
    const app = await this.persistenceService.byName(appName);
    let apiList: string[] = [];
    for (const productName of app.apiProducts) {
      const apiProduct: ApiProduct = await ApiProductsService.byName(
        productName
      );
      apiList = apiList.concat(apiProduct.apis);
    }
    return apiList;
  }

  async byName(name: string, syntax: TopicSyntax): Promise<AppResponse> {
    const app: App = await this.persistenceService.byName(name);
    const devApp = await DevelopersService.appByName(app['ownerId'], app.name, syntax);
    devApp['ownerId'] = app['ownerId'];
    return devApp;
  }
  async apiByName(appName: string, name: string): Promise<string> {
    const app = await this.persistenceService.byName(appName);
    const envs = await BrokerService.getMessagingProtocols(app);
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
    const spec = await ApisService.byName(name);
    // parse the spec - try to treat as JSON, if ails treat as YAML
    let specModel = null;
    try {
      specModel = JSON.parse(spec);
    } catch (e) {
      specModel = JSON.parse(AsyncAPIHelper.YAMLtoJSON(spec));
    }
    specModel.servers = servers;
    // add the username password security scheme
    specModel.components.securitySchemes = {};
    specModel.components.securitySchemes.userPassword = {
      type: 'userPassword',
      description: 'Username Password',
    };
    specModel.components.securitySchemes.httpBasic = {
      type: 'http',
      description: 'HTTP Basic',
      scheme: 'basic',
    };
    return JSON.stringify(specModel);
  }
}

export default new AppsService();

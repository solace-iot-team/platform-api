import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import DevelopersService from './developers.service';
import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';
import BrokerService from './broker.service';
import { Paging, PersistenceService } from './persistence.service';
import App = Components.Schemas.App;
import AppListItem = Components.Schemas.AppListItem;
import AppResponse = Components.Schemas.AppResponse;
import AppPatch = Components.Schemas.AppPatch;
import ApiProduct = Components.Schemas.APIProduct;

import AsyncAPIHelper from '../../../src/asyncapihelper'
import { AsyncAPIServer } from '../../../src/model/asyncapiserver';

export interface APISpecification {
  name: string,
  specification: string
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
    var apps = await this.persistenceService.all(query);
    var appList: AppListItem[] = [];
    apps.forEach((app: AppPatch) => {
      var listItem: AppListItem = {
        name: app.name,
        apiProducts: app.apiProducts,
        appType: app["appType"],
        status: app.status,
        ownerId: app["ownerId"]  
      };
      appList.push(listItem);
    });
    return appList;
  }

  async apiList(appName: string): Promise<string[]> {
    var app = await this.persistenceService.byName(appName);
    var apiList: string[] = [];
    for (var productName of app.apiProducts) {
      var apiProduct: ApiProduct = await ApiProductsService.byName(productName);
      apiList = apiList.concat(apiProduct.apis);
    }
    return apiList;
  }

  async byName(name: string): Promise<AppResponse> {
    var app: App = await this.persistenceService.byName(name);
    var devApp = await DevelopersService.appByName(app["ownerId"], app.name);
    devApp["ownerId"]=app["ownerId"];
    return devApp;
  }
  async apiByName(appName: string, name: string): Promise<string> {
    var app = await this.persistenceService.byName(appName);
    var envs = await BrokerService.getMessagingProtocols(app);
    var servers = {};
    for (var env of envs) {
      for (var protocol of env.messagingProtocols) {
        var server: AsyncAPIServer = {
          protocol: protocol.protocol.name,
          protocolVersion: protocol.protocol.version,
          url: protocol.uri
        }
        var serverKey: string = env.name;
        if (env.messagingProtocols.length > 1) {
          serverKey = `${env.name}-${protocol.protocol.name}`;
        }
        if (protocol.protocol.name.toUpperCase().startsWith("HTTP")){
          server.security = [{httpBasic:[]}];
        } else {
          server.security = [{userPassword:[]}];
        }
        servers[serverKey] = server;
      }
    }
    var spec = await ApisService.byName(name);
    // parse the spec - try to treat as JSON, if ails treat as YAML
    var specModel = null;
    try {
      specModel = JSON.parse(spec);
    }
    catch (e) {
      specModel = JSON.parse(AsyncAPIHelper.YAMLtoJSON(spec));
    }
    specModel.servers = servers;
    // add the username password security scheme
    specModel.components.securitySchemes = {};
    specModel.components.securitySchemes.userPassword= {type: "userPassword", description: "Username Password"};
    specModel.components.securitySchemes.httpBasic= {type: "http", description: "HTTP Basic", scheme: "basic"};
    return JSON.stringify(specModel);
  }
}

export default new AppsService();

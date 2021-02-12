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

  async list(paging: Paging, query: any): Promise<AppListItem[]> {
    var apps = await this.persistenceService.all(query, {}, paging);
    var appList: AppListItem[] = [];
    apps.forEach((app: AppPatch) => {
      var listItem: AppListItem = {
        name: app.name,
        apiProducts: app.apiProducts,
        appType: app["appType"],
        status: app.status
      };
      appList.push(listItem);
    });
    return appList;
  }

   async apiList(appName: string): Promise<string[]> {
    var app = await this.persistenceService.byName(appName);
    var apiList: string[] = [];
    app.apiProducts.forEach(async (productName: string) => {
      var apiProduct: ApiProduct = await ApiProductsService.byName(productName);
      apiList = apiList.concat(apiProduct.apis);
    });
    return apiList;
  }
 
  async byName(name: string): Promise<AppResponse> {
    var app: App = await this.persistenceService.byName(name);
    
    return DevelopersService.appByName(app["ownerId"], app.name);
  }
  async apiByName(appName: string, name: string): Promise<string> {
    var app = await this.persistenceService.byName(appName);
    var envs = await BrokerService.getMessagingProtocols(app);
    return ApisService.byName(name);
  }
}

export default new AppsService();

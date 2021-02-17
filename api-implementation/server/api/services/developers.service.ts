import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppResponse = Components.Schemas.AppResponse;
import ApiProductsService from './apiProducts.service';
import BrokerService from './broker.service';

import { Paging, PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';

var passwordGenerator = require('generate-password');

interface DeveloperApp extends App {
  appType?: string,
  ownerId?: string,
  status?: string
}

interface DeveloperAppPatch extends AppPatch {
  appType?: string,
  ownerId?: string
}

export class DevelopersService {
  private persistenceService: PersistenceService;
  private appPersistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('developers');
    this.appPersistenceService = new PersistenceService('apps');
  }

  all(): Promise<Developer[]> {
    return this.persistenceService.all();
  }

  async allDevelopersApps(name: string, paging: Paging, query: any): Promise<App[]> {
    query.ownerId = name;
    query.appType = 'developer';
    try {
      var dev: Developer = await this.persistenceService.byName(name);
      if (dev === null) {
        return new Promise<App[]>((resolve, reject) => {
          reject(new ErrorResponseInternal(404, `Object ${name} not found`));
        });
      }
    } catch (e) {
      L.error(e);
      throw e;
    }
    return this.appPersistenceService.all(query, {}, paging);
  }

  byName(name: string): Promise<Developer> {
    return this.persistenceService.byName(name);
  }

  async appByName(developer: string, name: string): Promise<AppResponse> {
    try {
      var app: AppResponse = await this.appPersistenceService.byName(name, { ownerId: developer });
      var dev: Developer = await this.persistenceService.byName(developer);
      if (app) {


        var endpoints = await BrokerService.getMessagingProtocols(app);

        app.environments = endpoints;
        for (var appEnv of app.environments) {
          var permissions = await BrokerService.getPermissions(app, dev, appEnv.name);
          appEnv.permissions = permissions;
        }
      } else {
        throw (404);
      }
      return app;
    } catch (e) {

    }
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }

  deleteApp(developer: string, name: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const d = await this.byName(developer);
        try {
          var app: App = await this.appPersistenceService.byName(name, { ownerId: developer });
          var x = await BrokerService.deprovisionApp(app);
          resolve(this.appPersistenceService.delete(name, { ownerId: developer }));
        } catch (e) {
          reject(e);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  create(body: Developer): Promise<Developer> {
    return this.persistenceService.create(body.userName, body);
  }

  async createApp(developer: string, body: App): Promise<App> {
    var dev = null;
    try {
      dev = await this.persistenceService.byName(developer)
    } catch (e) {
      // do nothing
    }
    if (dev === null) {
      throw new ErrorResponseInternal(404, `Entity ${developer} does not exist`);
    }
    L.info(dev);
    var app: DeveloperApp = {
      ownerId: developer,
      appType: "developer",
      name: body.name,
      apiProducts: body.apiProducts,
      credentials: body.credentials
    };
    if (body.attributes)
      app.attributes = body.attributes;
    if (body.callbackUrl)
      app.callbackUrl = body.callbackUrl;
    if (body.webHooks)
      app.webHooks = body.webHooks;

    L.info(`App create request ${JSON.stringify(app)}`);
    try {
      var validated = await this.validateAPIProducts(app);
      if (validated) {
        app.status = 'approved';
      } else {
        app.status = 'pending';
      }

      if (!app.credentials.secret) {
        var consumerCredentials = {
          consumerKey: passwordGenerator.generate({
            length: 32, numbers: true, strict: true
          }),
          consumerSecret: passwordGenerator.generate({
            length: 16, numbers: true, strict: true
          })
        };
        app.credentials.secret = consumerCredentials;
      }

      var newApp: DeveloperApp = await this.appPersistenceService.create(app.name, app);
      if (newApp.status == 'approved') {
        L.info(`provisioning app ${app.name}`);
        var r = await BrokerService.provisionApp(newApp as App, dev);
      }
      return newApp;
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  update(name: string, body: Developer): Promise<Developer> {
    return this.persistenceService.update(name, body);
  }

  async updateApp(developer: string, name: string, body: AppPatch): Promise<AppPatch> {
    var dev = null;
    try {
      dev = await this.persistenceService.byName(developer)
    } catch (e) {
      // do nothing
    }
    if (dev === null) {
      throw new ErrorResponseInternal(404, `Entity ${developer} does not exist`);
    }
    L.info(dev);
    var app: DeveloperAppPatch = {
      ownerId: developer,
      appType: "developer",
      name: name
    };

    if (body.apiProducts)
      app.apiProducts = body.apiProducts;
    if (body.attributes)
      app.attributes = body.attributes;
    if (body.callbackUrl)
      app.callbackUrl = body.callbackUrl;
    if (body.status)
      app.status = body.status;
    if (body.webHooks)
      app.webHooks = body.webHooks;

    L.info(`App patch request ${JSON.stringify(app)}`);
    var validated = await this.validateAPIProducts(app);
    var appPatch: AppPatch = await this.appPersistenceService.update(name, app);
    if (appPatch.status == 'approved') {
      L.info(`provisioning app ${app.name}`);
      var r = await BrokerService.provisionApp(appPatch as App, dev);
    }
    return appPatch;
  }

  // private methods

  private validateAPIProducts(app: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var isApproved: boolean = true;
      var results: Promise<boolean>[] = [];
      if (!app.apiProducts) {
        resolve(true);
      }
      app.apiProducts.forEach((product) => {
        results.push(new Promise<boolean>((resolve, reject) => {
          ApiProductsService.byName(product).then((p) => {
            if (p.approvalType == 'manual')
              isApproved = false;
            resolve(true);
          }
          ).catch((e) => {
            reject(`Referenced API Product ${product} does not exist`);
          })
        }));
      });
      Promise.all(results).then((r) => { resolve(isApproved) }).catch((e) => {
        L.info(e);
        reject(new ErrorResponseInternal(422, e));
      });

    }

    );
  }
}

export default new DevelopersService();

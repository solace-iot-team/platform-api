import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import App = Components.Schemas.App;
import Credentials = Components.Schemas.Credentials;
import Permissions = Components.Schemas.Permissions;
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

  allDevelopersApps(name: string, paging: Paging, query: any ): Promise<App[]> {
    query.ownerId = name;
    query.appType = 'developer';
    return this.appPersistenceService.all(query, {}, paging);
  }

  byName(name: string): Promise<Developer> {
    return this.persistenceService.byName(name);
  }

  async appByName(developer: string, name: string): Promise<AppResponse> {
    try {
      var app: AppResponse = await this.appPersistenceService.byName(name, { ownerId: developer });
      if (app) {
        var permissions = await BrokerService.getPermissions(app);
        var endpoints = await BrokerService.getMessagingProtocols(app);
        app.permissions = permissions;
        app.messagingProtocols = endpoints;
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
      const d = await this.byName(developer);
      L.info(d);
      if (!d) {
        reject(new ErrorResponseInternal(404, `Entity ${developer} does not exist`))
      }
      var promise: Promise<any> = this.appPersistenceService.byName(name, { ownerId: developer });
      promise.then(async (app) => {
        await BrokerService.deprovisionApp(app);
      }).catch((e) => reject(e));
      resolve(this.appPersistenceService.delete(name, { ownerId: developer }));
    });
  }

  create(body: Developer): Promise<Developer> {
    return this.persistenceService.create(body.userName, body);
  }

  createApp(developer: string, body: App): Promise<App> {
    return new Promise<App>(async (resolve, reject) => {
      const d = await this.byName(developer);
      L.info(d);
      if (!d) {
        reject(new ErrorResponseInternal(404, `Entity ${developer} does not exist`))
      }
      var app: DeveloperApp = {
        appType: 'developer',
        ownerId: developer,
        apiProducts: body.apiProducts,
        name: body.name,
        attributes: body.attributes,
        callbackUrl: body.callbackUrl,
        expiresIn: body.expiresIn,
        scopes: body.scopes,
        credentials: body.credentials

      };
      try {
        const approvalCheck = await this.validateAPIProducts(app);
        if (approvalCheck) {
          app.status = 'approved';
        } else {
          app.status = 'pending';
        }
        if (!body.credentials.secret) {
          var consumerCredentials = {
            consumerKey: passwordGenerator.generate({
              length: 32, numbers: true, strict: true
            }),
            consumerSecret: passwordGenerator.generate({
              length: 16, numbers: true, strict: true
            })
          };
          body.credentials.secret = consumerCredentials;
        }
        var promise: Promise<any> = this.appPersistenceService.create(body.name, app);
        promise.then(async (val) => {
          if (app.status == 'approved')
            await BrokerService.provisionApp(app);
        }).catch((e) => reject(e));
        resolve(promise);
      } catch (e) {
        L.error(`createApp ${e}`);
        reject(e);
      }
    });
  }

  update(name: string, body: Developer): Promise<Developer> {
    return this.persistenceService.update(name, body);
  }

  updateApp(developer: string, name: string, body: AppPatch): Promise<AppPatch> {
    return new Promise<App>((resolve, reject) => {
      this.byName(developer).then((d) => {
        L.info(d);
        if (!d) {
          reject(new ErrorResponseInternal(404, `Entity ${developer} does not exist`));
        }
        var app: DeveloperAppPatch = {
          ownerId: developer,
          appType: "developer",
          apiProducts: body.apiProducts,
          name: body.name,
          attributes: body.attributes,
          callbackUrl: body.callbackUrl,
          status: body.status

        };
        // don't care about approval check - we accept whatever status we get. but need to make sure references are valid
        this.validateAPIProducts(app).then((v) => {
          var promise: Promise<any> = this.appPersistenceService.update(name, app);
          promise.then((val: App) => {
            if (app.status == 'approved') {
              L.info(`provisioning app ${app.name}`);
              BrokerService.provisionApp(val).then((r) => resolve(promise)).catch((e)=> reject(e));
            } else {
              resolve(promise);
            }
          }).catch((e) => reject(e));

        }).catch(e => {
          reject(e);
        });
      });
    });
  }

  // private methods

  private validateAPIProducts(app: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var isApproved: boolean = true;
      var results: Promise<boolean>[] = [];
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

import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import App = Components.Schemas.App;
import Credentials = Components.Schemas.Credentials;
import AppPatch = Components.Schemas.AppPatch;
import ApiProductsService from './apiProducts.service';
import BrokerService from './broker.service';

import { PersistenceService } from './persistence.service';

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

  allDevelopersApps(name: string): Promise<App[]> {
    return this.appPersistenceService.all({ ownerId: name, appType: 'developer' });
  }

  byName(name: string): Promise<Developer> {
    return this.persistenceService.byName(name);
  }

  appByName(developer: string, name: string): Promise<Developer> {
    return this.appPersistenceService.byName(name, { ownerId: developer });
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }

  deleteApp(developer: string, name: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      const d = await this.byName(developer);
      L.info(d);
      if (!d) {
        reject(404);
      }
      var promise: Promise<any> =this.appPersistenceService.byName(name, { ownerId: developer });
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
        reject(404);
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
          await BrokerService.provisionApp(app)
      }).catch((e) => reject(e));
      resolve(promise);
    });
  }

  update(name: string, body: Developer): Promise<Developer> {
    return this.persistenceService.update(name, body);
  }

  updateApp(developer: string, name: string, body: AppPatch): Promise<AppPatch> {
    return new Promise<App>(async (resolve, reject) => {
      this.byName(developer).then((d) => {
        L.info(d);
        if (!d) {
          reject(404);
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
        try {
          // don't care about approval check - we accept whatever status we get. but need to make sure references are valid
          const approvalCheck = this.validateAPIProducts(app);
          resolve(this.appPersistenceService.update(name, app));
          var promise: Promise<any> = this.appPersistenceService.update(name, app);
          promise.then(async (val: App) => {
            if (app.status == 'approved')
              await BrokerService.provisionApp(val);
          }).catch((e) => reject(e));
          resolve(promise);
        } catch {
          reject(422);
        }
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
        reject(422);
      });

    }

    );
  }
}

export default new DevelopersService();

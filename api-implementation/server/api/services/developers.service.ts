import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppResponse = Components.Schemas.AppResponse;
import WebHook = Components.Schemas.WebHook;
import ApiProductsService from './apiProducts.service';
import BrokerService from './broker.service';

import { Paging, PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';

import passwordGenerator from 'generate-password';

interface DeveloperApp extends App {
  appType?: string;
  ownerId?: string;
  status?: string;
}

interface DeveloperAppPatch extends AppPatch {
  appType?: string;
  ownerId?: string;
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

  async allDevelopersApps(
    name: string,
    paging: Paging,
    query: any
  ): Promise<App[]> {
    query.ownerId = name;
    query.appType = 'developer';
    try {
      const dev: Developer = await this.persistenceService.byName(name);
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
      const ownerId = {
        ownerId: developer,
      };
      const app: AppResponse = await this.appPersistenceService.byName(
        name,
        ownerId
      );
      const dev: Developer = await this.persistenceService.byName(developer);
      if (app) {
        const endpoints = await BrokerService.getMessagingProtocols(app);
        app.environments = endpoints;
        for (const appEnv of app.environments) {
          const permissions = await BrokerService.getPermissions(
            app,
            dev,
            appEnv.name
          );
          appEnv.permissions = permissions;
        }
      } else {
        throw 404;
      }
      return app;
    } catch (e) {
      throw new ErrorResponseInternal(500, e);
    }
  }

  async delete(name: string): Promise<number> {
    if (await this.canDeleteDeveloper(name)) {
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(
        409,
        `Can't delete, developer is still referenced`
      );
    }
  }

  deleteApp(developer: string, name: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const d = await this.byName(developer);
        try {
          const q = {
            ownerId: developer,
          };
          const app: App = await this.appPersistenceService.byName(name, q);
          const x = await BrokerService.deprovisionApp(app);
          resolve(this.appPersistenceService.delete(name, q));
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
    let dev = null;
    try {
      dev = await this.persistenceService.byName(developer);
    } catch (e) {
      // do nothing
    }
    if (dev === null) {
      throw new ErrorResponseInternal(
        404,
        `Entity ${developer} does not exist`
      );
    }
    L.info(dev);
    const app: DeveloperApp = {
      ownerId: developer,
      appType: 'developer',
      name: body.name,
      apiProducts: body.apiProducts,
      credentials: body.credentials,
    };
    if (body.attributes) {
      app.attributes = body.attributes;
    }
    if (body.callbackUrl) {
      app.callbackUrl = body.callbackUrl;
    }
    if (body.webHooks) {
      app.webHooks = body.webHooks;
    }

    L.info(`App create request ${JSON.stringify(app)}`);
    try {
      const validated = await this.validate(app);
      if (validated) {
        app.status = 'approved';
      } else {
        app.status = 'pending';
      }

      if (!app.credentials.secret) {
        const consumerCredentials = {
          consumerKey: passwordGenerator.generate({
            length: 32,
            numbers: true,
            strict: true,
          }),
          consumerSecret: passwordGenerator.generate({
            length: 16,
            numbers: true,
            strict: true,
          }),
        };
        app.credentials.secret = consumerCredentials;
      }

      const newApp: DeveloperApp = await this.appPersistenceService.create(
        app.name,
        app
      );
      if (newApp.status == 'approved') {
        L.info(`provisioning app ${app.name}`);
        const r = await BrokerService.provisionApp(newApp as App, dev);
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

  async updateApp(
    developer: string,
    name: string,
    body: AppPatch
  ): Promise<AppPatch> {
    let dev = null;
    try {
      dev = await this.persistenceService.byName(developer);
    } catch (e) {
      // do nothing
    }
    if (dev === null) {
      throw new ErrorResponseInternal(
        404,
        `Entity ${developer} does not exist`
      );
    }
    L.info(dev);
    const app: DeveloperAppPatch = {
      ownerId: developer,
      appType: 'developer',
      name: name,
    };

    if (body.apiProducts) {
      app.apiProducts = body.apiProducts;
    }
    if (body.attributes) {
      app.attributes = body.attributes;
    }
    if (body.callbackUrl) {
      app.callbackUrl = body.callbackUrl;
    }
    if (body.status) {
      app.status = body.status;
    }
    if (body.webHooks) {
      app.webHooks = body.webHooks;
    }

    L.info(`App patch request ${JSON.stringify(app)}`);
    const validated = await this.validate(app);
    const appPatch: AppPatch = await this.appPersistenceService.update(
      name,
      app
    );
    if (appPatch.status == 'approved') {
      L.info(`provisioning app ${app.name}`);
      const r = await BrokerService.provisionApp(appPatch as App, dev);
    }
    return appPatch;
  }

  // private methods

  private async validate(app: any): Promise<boolean> {
    let isApproved = true;
    const environments: Set<string> = new Set();
    if (!app.apiProducts) {
      return isApproved;
    }

    // validate api products exist and find out if any  require approval
    for (const product of app.apiProducts) {
      try {
        const apiProduct = await ApiProductsService.byName(product);
        apiProduct.environments.forEach((envName) => {
          environments.add(envName);
        });
        if (apiProduct.approvalType == 'manual') {
          isApproved = false;
        }
      } catch (e) {
        throw new ErrorResponseInternal(
          422,
          `Referenced API Product ${product} does not exist`
        );
      }
    }

    if (app.webHooks != null) {
      const webHooks: WebHook[] = app.webHooks as WebHook[];

      webHooks.forEach((webHook) => {
        if (
          webHook.environments !== null &&
          webHook.environments !== undefined
        ) {
          L.info(webHook.environments);
          webHook.environments.forEach((envName) => {
            const hasEnv = environments.has(envName);
            if (!hasEnv) {
              throw new ErrorResponseInternal(
                422,
                `Referenced environment ${envName} is not associated with any API Product`
              );
            }
          });
        }
      });
    }

    return isApproved;
  }

  private async canDeleteDeveloper(name: string): Promise<boolean> {
    const q = {
      ownerId: {
        $eq: name,
      },
    };
    const devs = await this.appPersistenceService.all(q);
    if (devs == null || devs.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default new DevelopersService();

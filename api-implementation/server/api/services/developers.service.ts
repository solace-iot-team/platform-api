import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppResponse = Components.Schemas.AppResponse;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import WebHookNameList = Components.Schemas.WebHookNameList;
import WebHook = Components.Schemas.WebHook;
import AppsService from './apps.service';
import AppFactory from './apps/appfactory';
import WebHookHelpers from './apps/webhookhelpers';
import BrokerService from './broker.service';

import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import preconditionCheck from './persistence/preconditionhelper';
import { updateProtectionByObject } from './persistence/preconditionhelper';

export interface DeveloperApp extends App {
  appType?: string;
  ownerId?: string;
  status?: string;
}

export interface DeveloperAppPatch extends AppPatch {
  appType?: string;
  ownerId?: string;
}

export class DevelopersService {
  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('developers');

  }

  all(): Promise<Developer[]> {
    return this.persistenceService.all();
  }

  async allDevelopersApps(name: string, query: any): Promise<App[]> {
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
    const apps = await AppsService.all(query);
    for (const app of apps) {
      await AppFactory.transformToExternalAppRepresentation(app);
    }
    return apps;
  }

  byName(name: string): Promise<Developer> {
    return this.persistenceService.byName(name);
  }

  async appByName(
    developer: string,
    name: string,
    syntax: TopicSyntax
  ): Promise<AppResponse> {
    try {
      const dev: Developer = await this.persistenceService.byName(developer);
      const app: AppResponse = await AppsService.byNameAndOwnerId(
        name,
        developer,
        syntax,
        dev.attributes,
      );
      if (app) {
        const endpoints = await BrokerService.getMessagingProtocols(app);
        app.environments = endpoints;
        for (const appEnv of app.environments) {
          const permissions = await BrokerService.getPermissions(
            app,
            dev.attributes,
            appEnv.name,
            syntax
          );
          appEnv.permissions = permissions;
        }
      } else {
        throw 404;
      }
      await AppFactory.transformToExternalAppRepresentation(app);
      return app;
    } catch (e) {
      throw e;
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
    return AppsService.delete(name, developer);
  }

  create(body: Developer): Promise<Developer> {
    return this.persistenceService.create(body.userName, body);
  }

  async createApp(developer: string, body: App): Promise<App> {

    let dev: Developer = null;
    try {
      dev = await this.persistenceService.byName(developer);
    } catch (e) {
      // do nothing
    }
    if (dev === null) {
      dev = {
        email: `${developer}@nowhere.com`,
        firstName: developer,
        lastName: developer,
        userName: developer
      };
      dev = await this.create(dev);
    }
    L.debug(dev);
    const app: DeveloperApp = AppFactory.createDeveloperApp(body, developer);
    L.info(`App create request ${JSON.stringify(app)}`);
    try {
      const newApp: DeveloperApp = await AppsService.create(
        app.name,
        app,
        dev.attributes
      );
      return this.appByName(developer, app.name, 'smf');
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  async update(name: string, body: Developer): Promise<Developer> {
    await preconditionCheck(this, name);
    return this.persistenceService.update(name, body);
  }

  async updateApp(
    developer: string,
    name: string,
    body: AppPatch
  ): Promise<AppPatch> {
    try {
      await updateProtectionByObject(await this.appByName(developer, name, 'smf'));
    } catch (e) {
      await updateProtectionByObject(await this.appByName(developer, name, 'mqtt'));
    }
    return await this.updateAppInternal(developer, name, body);
  }

  private async updateAppInternal(
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
    L.debug(dev);
    const app: DeveloperAppPatch = AppFactory.createDeveloperAppBatch(body, developer);
    const appPatch: AppPatch = await AppsService.update(
      developer,
      name,
      app,
      dev.attributes
    );
    await AppFactory.transformToExternalAppRepresentation(appPatch);
    return appPatch;
  }

  // webhooks
  async allAppWebHooks(
    developer: string,
    name: string
  ): Promise<WebHookNameList> {
    try {
      const dev: Developer = await this.persistenceService.byName(developer);
      const app: AppResponse = await AppsService.byNameAndOwnerId(
        name,
        developer,
        'smf',
        dev.attributes,
      );
      if (app) {
        return WebHookHelpers.getWebHookListFromApp(app);
      } else {
        throw new ErrorResponseInternal(404, 'No app found');
      }
    } catch (e) {
      throw e;
    }
  }
  async webHookByName(
    developer: string,
    appName: string,
    name: string
  ): Promise<WebHook> {
    try {
      const dev: Developer = await this.persistenceService.byName(developer);
      const app: AppResponse = await AppsService.byNameAndOwnerId(
        name,
        developer,
        'smf',
        dev.attributes,
      );
      if (app) {
        return WebHookHelpers.getWebHookByName(name, app);
      } else {
        throw new ErrorResponseInternal(404, `Could not find ${appName} for ${developer}`);
      }
    } catch (e) {
      throw e;
    }
  }


  async createWebHook(
    developer: string,
    appName: string,
    body: WebHook
  ): Promise<WebHook> {
    const name: string = body.name ? body.name : body.uri;
    const app: AppResponse = await this.appByName(developer, appName, 'smf');
    if (app) {
      try {
        WebHookHelpers.getWebHookByName(name, app);
        throw new ErrorResponseInternal(422, `WebHook already exists`)
      } catch (e) {
        if (app.webHooks) {
          app.webHooks.push(body);
        } else {
          app.webHooks = [body];

        }
        await this.updateAppInternal(developer, appName, app);
      }
    } else {
        throw new ErrorResponseInternal(404, `Could not find ${appName} for ${developer}`);
    }
    return body;
  }


  async updateWebHook(
    developer: string,
    appName: string,
    name: string,
    body: WebHook
  ): Promise<WebHook> {

    const app: AppResponse = await this.appByName(developer, appName, 'smf');
    if (app) {
      WebHookHelpers.patchAppWebHook(name, app, body);
      await this.updateAppInternal(developer, appName, app);
    }
    return WebHookHelpers.getWebHookByName(name, app);
  }

  async deleteWebHook(
    developer: string,
    appName: string,
    name: string,
  ): Promise<number> {

    const app: AppResponse = await this.appByName(developer, appName, 'smf');
    if (app) {
      WebHookHelpers.deleteAppWebHook(name, app);
      await this.updateAppInternal(developer, appName, app);
    }
    return 204;
  }


  // private methods
  private async canDeleteDeveloper(name: string): Promise<boolean> {
    const q = {
      ownerId: {
        $eq: name,
      },
    };
    const devs = await AppsService.all(q);
    if (devs == null || devs.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default new DevelopersService();

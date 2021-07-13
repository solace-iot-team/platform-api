import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import DevelopersService from './developers.service';
import TeamsService from './teams.service';
import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';
import BrokerService from './broker.service';
import { PersistenceService } from './persistence.service';
import App = Components.Schemas.App;
import AppListItem = Components.Schemas.AppListItem;
import AppResponse = Components.Schemas.AppResponse;
import AppPatch = Components.Schemas.AppPatch;
import passwordGenerator from 'generate-password';
import ApiProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import WebHook = Components.Schemas.WebHook;

import AsyncAPIHelper from '../../../src/asyncapihelper';
import { AsyncAPIServer } from '../../../src/model/asyncapiserver';
import teamsService from './teams.service';

export interface APISpecification {
  name: string;
  specification: string;
}

interface OwnedApp extends App {
  appType?: string;
  ownerId?: string;
  status?: string;
}
export class AppsService {
  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apps');
  }

  async all(query?: any): Promise<App[]> {
    return this.persistenceService.all(query);
  }

  async list(query: any): Promise<AppListItem[]> {
    const apps = await this.persistenceService.all(query);
    const appList: AppListItem[] = [];
    apps.forEach((app: AppResponse) => {
      const listItem: AppListItem = {
        name: app.name,
        displayName: app.displayName ? app.displayName : app.name,
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
    const theApp = await this.byNameAndOwnerId(app.name, app['ownerId'], syntax, await this.getAttributes(app['appType'], app['ownerId']));
    theApp['ownerId'] = app['ownerId'];
    return theApp;
  }


  async byNameAndOwnerId(
    name: string,
    ownerId: string,
    syntax: TopicSyntax,
    ownerAttributes: Attributes
  ): Promise<AppResponse> {
    try {
      const ownerIdQuery = {
        ownerId: ownerId,
      };
      const app: AppResponse = await this.persistenceService.byName(
        name,
        ownerIdQuery
      );
      if (app) {
        const endpoints = await BrokerService.getMessagingProtocols(app);
        app.environments = endpoints;
        for (const appEnv of app.environments) {
          const permissions = await BrokerService.getPermissions(
            app,
            ownerAttributes,
            appEnv.name,
            syntax
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

  async create(name: string, newApp: App, ownerAttributes: Attributes): Promise<App> {
    const app = newApp as OwnedApp;
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

      if (app.status == 'approved') {
        L.info(`provisioning app ${app.name}`);
        const r = await BrokerService.provisionApp(newApp as App, ownerAttributes);
      }
      try {
        const newApp: OwnedApp = await this.persistenceService.create(
          name,
          app
        );
        return newApp;
      } catch (e) {
        const r = await BrokerService.deprovisionApp(app);
        throw (e);
      }
    } catch (e) {
      L.error(e);
      throw e;
    }
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

  async update(
    owner: string,
    name: string,
    app: AppPatch,
    ownerAttributes: Attributes
  ): Promise<AppPatch> {
    L.info(`App patch request ${JSON.stringify(app)}`);
    const validated = await this.validate(app);
    const appNotModified: AppPatch = await this.persistenceService.byName(
      name
    );
    let appPatch: AppPatch = await this.persistenceService.update(
      name,
      app
    );
    let areCredentialsUpdated: boolean = false;
    if (app.credentials) {
      areCredentialsUpdated = true;
    }
    if (appPatch.status == 'approved') {
      if (areCredentialsUpdated) {
        const r = await BrokerService.deprovisionApp(appPatch as App);
      }
      L.info(`provisioning app ${name}`);
      try {
        const r = await BrokerService.provisionApp(appPatch as App, ownerAttributes);
      }
      catch (e) {
        appPatch = await this.persistenceService.update(
          name,
          appNotModified
        );
        const r = await BrokerService.provisionApp(appPatch as App, ownerAttributes);
      }
    }
    return appPatch;
  }

  async delete(name: string, owner: string): Promise<number> {
    try {
      const q = {
        ownerId: owner,
      };
      const app: App = await this.byNameAndOwnerId(name, owner, 'smf', null);
      const x = await BrokerService.deprovisionApp(app);
      return this.persistenceService.delete(name, q);
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  async validate(app: any): Promise<boolean> {
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

  private async getAttributes(appType: string, ownerId: string): Promise<Attributes> {
    let attrs: Attributes = null;
    if (appType == 'team') {
      attrs = (await TeamsService.byName(ownerId)).attributes;
    } else {
      attrs = (await DevelopersService.byName(ownerId)).attributes;
    }
    L.info(attrs);
    return attrs;
  }

}

export default new AppsService();

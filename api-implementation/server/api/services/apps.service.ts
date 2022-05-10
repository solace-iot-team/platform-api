import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import DevelopersService from './developers.service';
import TeamsService from './teams.service';
import ApiProductsService from './apiProducts.service';
import BrokerService from './broker.service';
import { PersistenceService } from './persistence.service';
import App = Components.Schemas.App;
import AppListItem = Components.Schemas.AppListItem;
import AppResponse = Components.Schemas.AppResponse;
import AppPatch = Components.Schemas.AppPatch;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;

import ApiProduct = Components.Schemas.APIProduct;
import AppApiProductsComplex = Components.Schemas.AppApiProductsComplex;
import AppStatus = Components.Schemas.AppStatus;

import Attributes = Components.Schemas.Attributes;
import ClientInformation = Components.Schemas.ClientInformation;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import WebHook = Components.Schemas.WebHook;
import AsyncApiGenerator from './asyncapi/asyncapigenerator';
import QueueHelper from './broker/queuehelper';
import ACLManager from './broker/aclmanager';

import { isString } from '../../../src/typehelpers';
import APIProductsTypeHelper from '../../../src/apiproductstypehelper';
import AppHelper from '../../../src/apphelper';

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
        APIProductsTypeHelper.apiProductReferenceToString(productName)
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

  async statusByName(name: string): Promise<AppConnectionStatus> {
    const app: App = await this.persistenceService.byName(name);

    return await BrokerService.getAppStatus(app);
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
        const subs = await ACLManager.getQueueSubscriptionsByApp(app);
        const requireClientInformation: boolean = subs.length > 0;
        if (requireClientInformation) {
          const clientInformation: ClientInformation[] = [];
          for (const apiProductReference of app.apiProducts) {
            const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
            const apiProduct = await ApiProductsService.byName(productName);
            const isSupportedProtocol: boolean = apiProduct.protocols.find(p => p.name.toString().indexOf('smf') > -1
              || p.name.toString().indexOf('jms') > -1) != null;
            if (isSupportedProtocol && apiProduct.clientOptions
              && apiProduct.clientOptions.guaranteedMessaging
              && apiProduct.clientOptions.guaranteedMessaging.requireQueue) {
              clientInformation.push({
                guaranteedMessaging: {
                  name: QueueHelper.getAPIProductQueueName(app, apiProduct),
                  accessType: apiProduct.clientOptions.guaranteedMessaging.accessType,
                  apiProduct: productName,
                  maxMsgSpoolUsage: apiProduct.clientOptions.guaranteedMessaging.maxMsgSpoolUsage,
                  maxTtl: apiProduct.clientOptions.guaranteedMessaging.maxTtl,
                }
              });
            }
          }
          if (clientInformation.length > 0) {
            app.clientInformation = clientInformation;
          }
        }
      } else {
        throw 404;
      }
      return app;
    } catch (e) {
      throw e;
    }
  }

  async create(name: string, newApp: App, ownerAttributes: Attributes): Promise<App> {
    let appExists = null;
    try {
      appExists = await this.persistenceService.byName(name);
    } catch (e) {
      // do nothing, we want the app to be missing
    }
    if (appExists) {
      throw new ErrorResponseInternal(422, `Duplicate app name`);
    }

    const app = newApp as OwnedApp;
    try {
      const validated = await this.validate(app);
      if (validated) {
        app.status = 'approved';
      } else {
        app.status = 'pending';
      }
      await this.initializeStatus(app);

      if (!app.credentials.secret) {
        const consumerCredentials = {
          consumerKey: AppHelper.generateConsumerKey(),
          consumerSecret: AppHelper.generateConsumerSecret(),
        };
        app.credentials.secret = consumerCredentials;
      } else if (!app.credentials.secret.consumerSecret) {
        // this provides the capability to provide a specific key (e.g. matching an OAuth claim or TLS cert CN)
        // while ensuring a strong secret is set on the app and therefore in the SOlace client username.
        app.credentials.secret.consumerSecret = AppHelper.generateConsumerSecret();
      }
      // set the issuedAt and calculate expiresAt timestamp
      AppHelper.resetCredentialsDates(app);

      if (app.status == 'approved') {
        L.info(`provisioning app ${app.name}`);
        const r = await BrokerService.provisionApp(newApp as App, ownerAttributes, false);
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
    const list = await this.apiList(appName);
    if (list.find(n => n == name)) {
      const app = await this.persistenceService.byName(appName);
      return AsyncApiGenerator.getSpecificationByApp(name, app);
    } else {
      throw new ErrorResponseInternal(404, `API [${name}] is not associated with app [${appName}]`);
    }
  }

  async update(
    owner: string,
    name: string,
    app: AppPatch,
    ownerAttributes: Attributes
  ): Promise<AppPatch> {
    L.info(`App patch request ${JSON.stringify(app)}`);
    const validated = await this.validate(app, true);
    // need to hold on to unmodified app so we can roll back if required and can determine changes during reprovisioning
    const appNotModified: AppPatch = await this.persistenceService.byName(
      name
    );
    if (app.credentials && app.credentials.secret && !app.credentials.secret.consumerSecret) {
      // regenerate a consumerSecret if omitted / partial secret is sent
      app.credentials.secret.consumerSecret = AppHelper.generateConsumerSecret();
      // set the issuedAt and calculate expiresAt timestamp
      const now: number = Date.now();
      app.credentials.issuedAt = now;
      if (app.expiresIn && app.expiresIn > 0) {
        app.credentials.expiresAt = now + app.expiresIn;
      } else if (appNotModified.expiresIn && appNotModified.expiresIn > 0) {
        app.credentials.expiresAt = now + (appNotModified.expiresIn*1000);
      } else {
        app.credentials.expiresAt = -1;
      }
    } else if (app.expiresIn) {
      // if expiresIn provided apply it to the previous expiration date.
      app.credentials = appNotModified.credentials;
      if (app.expiresIn > 0) {
        app.credentials.expiresAt = app.credentials.issuedAt + (app.expiresIn*1000);
      } else {
        app.credentials.expiresAt = -1;
      }
    }

    await this.updateStatus(app as App, appNotModified as App);
    // persist the updated app, need to do this to get the full app object, the patch rerquest contains only the updated properties
    let appPatch: AppPatch = await this.persistenceService.update(
      name,
      app
    );
    // we only take action if the app is in approved status
    if (appPatch.status == 'approved') {
      const result: boolean = await BrokerService.reProvisionApp(appPatch as App, appNotModified as App, ownerAttributes);
      // roll back database changes
      if (!result) {
        appPatch = await this.persistenceService.update(
          name,
          appNotModified
        );
        throw new ErrorResponseInternal(500, 'App provisioning failed');
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

  async validate(app: any, isUpdate: boolean = false): Promise<boolean> {
    let isApproved = true;
    const environments: Set<string> = new Set();
    if ((!app.apiProducts || app.apiProducts.length == 0) && !isUpdate) {
      return false;
    } else if (!app.apiProducts) {
      return true;
    }

    // validate api products exist and find out if any  require approval
    for (const product of app.apiProducts) {
      let productName: string = null;
      if (isString(product)) {
        productName = product as string;
      } else {
        productName = (product as AppApiProductsComplex).apiproduct;
        if (product.status && !isUpdate) {
          throw new ErrorResponseInternal(
            400,
            `Providing a status for associated API Products is not allowed. (API Product ${productName})`
          );
        }
      }
      try {
        const apiProduct = await ApiProductsService.byName(productName);
        apiProduct.environments.forEach((envName) => {
          environments.add(envName);
        });
        if (apiProduct.approvalType == 'manual') {
          isApproved = false;
        }
      } catch (e) {
        L.error(e);
        throw new ErrorResponseInternal(
          422,
          `Referenced API Product ${productName} does not exist`
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

  private async initializeStatus(app: App): Promise<void> {
    if (!app.apiProducts) {
      return;
    }
    for (const product of app.apiProducts) {
      let productName: string = APIProductsTypeHelper.apiProductReferenceToString(product);
      try {
        const apiProduct = await ApiProductsService.byName(productName);
        let productStatus = 'pending';
        if (apiProduct.approvalType == 'manual') {
          productStatus = 'pending';
        } else {
          productStatus = 'approved';
        }
        if (!isString(product) && !(product as AppApiProductsComplex).status) {
          (product as AppApiProductsComplex).status = productStatus as AppStatus;
        }
      } catch (e) {
        L.error(e);
        throw new ErrorResponseInternal(
          422,
          `Referenced API Product ${productName} does not exist`
        );
      }
    }

  }

  private async updateStatus(app: App, appPersistentState: App): Promise<void> {
    if (!app.apiProducts) {
      return;
    }
    for (const product of app.apiProducts) {
      let productName: string = APIProductsTypeHelper.apiProductReferenceToString(product);
      try {
        const apiProduct = await ApiProductsService.byName(productName);
        let productStatus = 'pending';
        if (apiProduct.approvalType == 'manual') {
          productStatus = 'pending';
        } else {
          productStatus = 'approved';
        }
        const persistentProduct = appPersistentState.apiProducts.find(a => !isString(a) && (a as AppApiProductsComplex).apiproduct == productName);

        const hasPersistentStatus: boolean = (persistentProduct && (persistentProduct as AppApiProductsComplex).status !== undefined);
        //L.error(`${hasPersistentStatus}`);
        if (!isString(product) && !(product as AppApiProductsComplex).status
        ) {
          if (hasPersistentStatus) {
            (product as AppApiProductsComplex).status = (persistentProduct as AppApiProductsComplex).status;
          } else {
            (product as AppApiProductsComplex).status = (productStatus as AppStatus);
          }
        }
      } catch (e) {
        L.error(e);
        throw new ErrorResponseInternal(
          422,
          `Referenced API Product ${productName} does not exist`
        );
      }
    }
  }
}

export default new AppsService();

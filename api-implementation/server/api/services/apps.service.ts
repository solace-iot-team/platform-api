import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import DevelopersService from './developers.service';
import TeamsService from './teams.service';
import ApiProductsService from './apiProducts.service';
import BrokerFactory from './broker.factory';
import { PersistenceService } from './persistence.service';
import App = Components.Schemas.App;
import AppListItem = Components.Schemas.AppListItem;
import AppResponse = Components.Schemas.AppResponse;
import AppPatch = Components.Schemas.AppPatch;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;
import Credentials = Components.Schemas.Credentials;
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

import { scheduler } from '../../index';
import ServiceRegistryFactory from '../../../src/serviceregistryfactory';
import EnvironmentsService from './environments.service';
import Environment = Components.Schemas.Environment;
import sempv2clientfactory from './broker/sempv2clientfactory';
import semVerCompare from 'semver-compare';

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

    return await BrokerFactory.getBroker().getAppStatus(app);
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
        const endpoints = await BrokerFactory.getBroker().getMessagingProtocols(app);
        app.environments = endpoints;
        try {
          for (const appEnv of app.environments) {
            const permissions = await BrokerFactory.getBroker().getPermissions(
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
              const isSupportedProtocol: boolean = QueueHelper.hasAPiProductRequiredGuaranteedMessagingProtocol(apiProduct);
              if (isSupportedProtocol && apiProduct.clientOptions?.guaranteedMessaging?.requireQueue) {
                if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
                  clientInformation.push({
                    guaranteedMessaging: {
                      name: QueueHelper.getAPIQueueName(app, apiProduct),
                      accessType: apiProduct.clientOptions.guaranteedMessaging.accessType,
                      apiProduct: productName,
                      maxMsgSpoolUsage: apiProduct.clientOptions.guaranteedMessaging.maxMsgSpoolUsage,
                      maxTtl: apiProduct.clientOptions.guaranteedMessaging.maxTtl,
                    }
                  });
                } else if (QueueHelper.isAPIQueueRequired(apiProduct)) {
                  for (const api of apiProduct.apis) {
                    clientInformation.push({
                      guaranteedMessaging: {
                        name: QueueHelper.getAPIQueueName(app, apiProduct, api),
                        accessType: apiProduct.clientOptions.guaranteedMessaging.accessType,
                        apiProduct: productName,
                        maxMsgSpoolUsage: apiProduct.clientOptions.guaranteedMessaging.maxMsgSpoolUsage,
                        maxTtl: apiProduct.clientOptions.guaranteedMessaging.maxTtl,
                      }
                    });
                  }
                }
              }
            }
            if (clientInformation.length > 0) {
              app.clientInformation = clientInformation;
            }
          }
        } catch (e) {
          L.warn(`Errors processing extended app information such as permissions, clientInformation`);
          L.warn(e);
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

      this.processAppCreateCredentials(app);

      if (app.status == 'approved') {
        L.info(`provisioning app ${app.name}`);
        const r = await BrokerFactory.getBroker().provision(newApp as App, ownerAttributes, false);
      }
      try {
        const newApp: OwnedApp = await this.persistenceService.create(
          name,
          app
        );
        return newApp;
      } catch (e) {
        const r = await BrokerFactory.getBroker().deprovision(app);
        throw (e);
      }
    } catch (e) {
      L.info(e);
      throw e;
    }
  }


  private processAppCreateCredentials(app: OwnedApp) {
    let credentialsArray: Components.Schemas.CredentialsArray = Array.isArray(app.credentials) ? app.credentials : [app.credentials];
    for (const credentials of credentialsArray) {
      if (!credentials.secret) {
        const consumerCredentials = {
          consumerKey: AppHelper.generateConsumerKey(),
          consumerSecret: AppHelper.generateConsumerSecret(),
        };
        credentials.secret = consumerCredentials;
      } else if (!credentials.secret.consumerSecret) {
        // this provides the capability to provide a specific key (e.g. matching an OAuth claim or TLS cert CN)
        // while ensuring a strong secret is set on the app and therefore in the SOlace client username.
        credentials.secret.consumerSecret = AppHelper.generateConsumerSecret();
      }
      // set the issuedAt and calculate expiresAt timestamp
      AppHelper.resetCredentialsDates(credentials, app.expiresIn);
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
    // reject request if app is being reprovisioned
    const isJobRunning: boolean = await scheduler.isJobDefined(name, null, true);
    if (isJobRunning) {
      L.debug(`is a job queued for ${name}, blocking app provisioning ${isJobRunning}`);
      throw new ErrorResponseInternal(412, `An update on this app is currently processing, please try again later`);
    }
    L.debug(`App patch request ${JSON.stringify(app)}`);
    // need to hold on to unmodified app so we can roll back if required and can determine changes during reprovisioning
    const appNotModified: AppPatch = await this.persistenceService.byName(
      name
    );

    const validated = await this.validate(app, true, appNotModified as App);
    this.processAppUpdateCredentials(app, appNotModified);

    await this.updateStatus(app as App, appNotModified as App);
    // persist the updated app, need to do this to get the full app object, the patch rerquest contains only the updated properties
    let appPatch: AppPatch = await this.persistenceService.update(
      name,
      app
    );
    // we only take action if the app is in approved status

    if (appPatch.status == 'approved') {
      try {
        await BrokerFactory.getBroker().reprovision(appPatch as App, appNotModified as App, ownerAttributes);
      } catch (e) {
        // roll back database changes
        appPatch = await this.persistenceService.update(
          name,
          appNotModified
        );
        throw e;
      }
    }
    return appPatch;
  }

  private processAppUpdateCredentials(app: AppPatch, appNotModified: AppPatch) {
    const credentialsArray: Components.Schemas.CredentialsArray = Array.isArray(app.credentials) ? app.credentials : [app.credentials];
    for (const credentials of credentialsArray) {
      if (credentials && credentials.secret) {
        // regenerate a consumerSecret if omitted / partial secret is sent
        if (!credentials.secret.consumerSecret) {
          credentials.secret.consumerSecret = AppHelper.generateConsumerSecret();
        }
        // set the issuedAt and calculate expiresAt timestamp
        const now: number = Date.now();
        credentials.issuedAt = now;
        if (app.expiresIn && app.expiresIn > 0) {
          credentials.expiresAt = now + app.expiresIn;
        } else if (appNotModified.expiresIn && appNotModified.expiresIn > 0) {
          credentials.expiresAt = now + (appNotModified.expiresIn * 1000);
        } else {
          credentials.expiresAt = -1;
        }
      } else if (app.expiresIn) {
        // if expiresIn provided apply it to the previous expiration date.
        app.credentials = appNotModified.credentials;
        if (app.expiresIn > 0) {
          credentials.expiresAt = credentials.issuedAt + (app.expiresIn * 1000);
        } else {
          credentials.expiresAt = -1;
        }
      }
    }
  }

  async delete(name: string, owner: string): Promise<number> {
    try {
      const q = {
        ownerId: owner,
      };
      const app: App = await this.byNameAndOwnerId(name, owner, 'smf', null);
      const x = await BrokerFactory.getBroker().deprovision(app);
      return this.persistenceService.delete(name, q);
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  async validate(app: any, isUpdate: boolean = false, appNotModified?: App): Promise<boolean> {
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
      let apiProductException: ErrorResponseInternal = null;
      try {
        const apiProduct = await ApiProductsService.byName(productName);


        // can only reference products in released and deprecated stage
        if (apiProduct.meta.stage != 'released' && apiProduct.meta.stage != 'deprecated' && apiProduct.meta.stage) {
          apiProductException = new ErrorResponseInternal(
            422,
            `Referenced API Product ${productName} can not be referenced as it is in stage ${apiProduct.meta.stage}`
          );
        }
        // deprecated products can not be added - so an App create is not allowed at all
        if (apiProduct.meta.stage == 'deprecated' && !isUpdate) {
          apiProductException = new ErrorResponseInternal(
            422,
            `API Product ${productName} in deprecated stage can not be added to a an App`
          );
        }
        // deprecated api products can only be referenced if they were previsouy referenced by the app
        if (apiProduct.meta.stage == 'deprecated' && !appNotModified?.apiProducts.find(a => APIProductsTypeHelper.apiProductReferenceToString(a) == apiProduct.name)) {
          apiProductException = new ErrorResponseInternal(
            422,
            `API Product ${productName} in deprecated stage can not be added to a an App`
          );
        }
        apiProduct.environments.forEach((envName) => {
          environments.add(envName);
        });
        if (apiProduct.approvalType == 'manual') {
          isApproved = false;
        }
      } catch (e) {
        L.error(e);
        apiProductException = new ErrorResponseInternal(
          422,
          `Referenced API Product ${productName} does not exist`
        );
      } finally {
        if (apiProductException) {
          throw apiProductException;
        }
      }
    }

    if (app.webHooks != null) {
      const webHooks: WebHook[] = app.webHooks as WebHook[];

      for (const webHook of webHooks) {
        const webHookEnvs = webHook.environments ? webHook.environments : environments;
        L.info(webHookEnvs);
        for (const envName of webHookEnvs) {
          const hasEnv = environments.has(envName);
          if (!hasEnv) {
            throw new ErrorResponseInternal(
              422,
              `Referenced environment ${envName} is not associated with any API Product`
            );
          }
          let webHooksPerDev: WebHook[] = [];
          webHooksPerDev = app.webHooks.filter((w: { environments: any[]; }) => w.environments == null || w.environments.find(e => e == envName));
          if (webHooksPerDev.length > 1) {
            throw new ErrorResponseInternal(
              400,
              `Multiple webHooks for  ${envName} are not supported`
            );
          }
          if (webHook.requestHeaders) {
            // need to check if this env supports headers
            const svc = await ServiceRegistryFactory.getRegistry().getServiceByEnvironment(await EnvironmentsService.byName(envName) as Environment);
            const sempVersion = await sempv2clientfactory.getSEMPv2ClientVersion(svc);
            const unsupportedVersion = semVerCompare(sempVersion, '2.23') == -1;
            if (unsupportedVersion) {
              throw new ErrorResponseInternal(
                422,
                `WebHook HTTP Request Headers not supported in ${envName}`
              );
            }
          }
        }


      }
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


  /**
* Attributes methods
* 
*/
  async attributeByName(appName: string, name: string, appType: string, appOwner: string): Promise<string> {
    const app: App = await this.persistenceService.byName(appName);
    if (app['appType'] != appType || app['ownerId'] != appOwner) {
      throw new ErrorResponseInternal(404, `App [${appName}] not found`);
    }
    if (!app.attributes) {
      throw new ErrorResponseInternal(404, `Attribute [${name}] is not set for app  [${appName}]`);
    }
    const attr = app.attributes.find(n => n.name == name);
    if (attr) {
      return attr.value;
    } else {
      throw new ErrorResponseInternal(404, `Attribute [${name}] is not set for app [${appName}]`);
    }
  }

  async createAttribute(appName: string, name: string, value: string, appType: string, appOwner: string): Promise<string> {
    const app: App = await this.persistenceService.byName(appName);
    if (!app.attributes) {
      app.attributes = [];
    }
    const attr = app.attributes.find(n => n.name == name);
    if (!attr) {
      app.attributes.push({
        name: name,
        value: value
      });
      await this.updateAppAttributes(appName, app, appType, appOwner);
      return value;
    } else {
      throw new ErrorResponseInternal(422, `Attribute [${name}] is already set for app  [${appName}]`);
    }
  }

  async updateAttribute(appName: string, attributeName: string, attributeValue: string, appType: string, appOwner: string): Promise<string> {
    const app: App = await this.persistenceService.byName(appName);
    if (!app.attributes) {
      app.attributes = [];
    }
    const attr = app.attributes.find(n => n.name == attributeName);
    if (attr) {
      attr.value = attributeValue;
      app.attributes[app.attributes.findIndex(n => n.name == attributeName)] = attr;
      await this.updateAppAttributes(appName, app, appType, appOwner);
      return attributeValue;
    } else {
      throw new ErrorResponseInternal(404, `Attribute [${attributeName}] is not set for app  [${appName}]`);
    }
  }

  async deleteAttribute(appName: string, attributeName: string, appType: string, appOwner: string): Promise<number> {
    const app: App = await this.persistenceService.byName(appName);
    if (!app.attributes) {
      app.attributes = [];
    }
    const attr = app.attributes.find(n => n.name == attributeName);
    if (attr) {
      const newAttributes = app.attributes.filter(n => n.name != attributeName);
      app.attributes = newAttributes;
      await this.updateAppAttributes(appName, app, appType, appOwner);
      return 204;
    } else {
      throw new ErrorResponseInternal(404, `Attribute [${attributeName}] is not set for app  [${appName}]`);
    }
  }
  /**
   * Update an API Info after an attribute has been updated. 
   * @param app 
   */
  private async updateAppAttributes(appName: string, app: App, appType: string, appOwner: string): Promise<AppPatch> {
    if (app['appType'] != appType || app['ownerId'] != appOwner) {
      if (app['appType'] != appType) {
        throw new ErrorResponseInternal(404, `App [${appName}] not found`);
      }
      const ownerAttributes = await this.getAttributes(app['appType'], app['ownerId']);
      return this.update(app['ownerId'], appName, (app as AppPatch), ownerAttributes);
    }

  }
}
export default new AppsService();

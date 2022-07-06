import L from '../../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;
import { Service } from '../../../../src/clients/solacecloud/models/Service';
import ApiProductTypeOperations from '../../../../src/apiproductstypehelper';

export class QueueHelper {

  public getAPIQueueName(app: App, apiProduct: APIProduct, api?: string): string {
    if (app && api) {
      return `${app.internalName}-${apiProduct.name}-${api}`;
    } else if (app) {
      return `${app.internalName}-${apiProduct.name}`;
    } else {
      return `${apiProduct.name}`;
    }
  }

  public areAppQueuesRequired(apiProducts: APIProduct[]): boolean {
    for (const apiProduct of apiProducts) {
      if (this.isAPIProductQueueRequired(apiProduct)) {
        L.debug(`API Product ${apiProduct.name} requires a queue`)
        return true;
      }
    }
    L.debug(`app doesn't require queues`);
    return false;
  }

  public isAPIProductQueueRequired(apiProduct: APIProduct): boolean {
    if (!this.hasAPiProductRequiredGuaranteedMessagingProtocol(apiProduct)) {
      return false;
    }
    return ApiProductTypeOperations.isGuaranteedMessagingEnabled(apiProduct)
      && apiProduct.clientOptions.guaranteedMessaging.requireQueue
      && (apiProduct.clientOptions.guaranteedMessaging.queueGranularity == 'apiProduct'
        || !apiProduct.clientOptions.guaranteedMessaging.queueGranularity);
  }

  public isAPIQueueRequired(apiProduct: APIProduct): boolean {
    if (!this.hasAPiProductRequiredGuaranteedMessagingProtocol(apiProduct)) {
      return false;
    }
    return ApiProductTypeOperations.isGuaranteedMessagingEnabled(apiProduct)
      && apiProduct.clientOptions.guaranteedMessaging.requireQueue
      && (apiProduct.clientOptions.guaranteedMessaging.queueGranularity == 'api');
  }

  public hasAPiProductRequiredGuaranteedMessagingProtocol(apiProduct: APIProduct): boolean {
    // at the moment we require AMQP, JMS or SMF protocols
    if (!apiProduct.protocols) {
      return false;
    }
    if (apiProduct.protocols.filter(e => (
      e.name == 'amqp' || e.name == 'amqps' ||
      e.name == 'jms' || e.name == 'secure-jms' ||
      e.name == 'smf' || e.name == 'smfs')
    ).length == 0) {
      return false;
    } else {
      return true;
    }

  }

  public filterServicesForWebHook(app: App, services: Service[]): Service[] {
    let envNames = [];
    if (app.webHooks) {
      for (const webHook of app.webHooks) {
        if (webHook.environments) {
          envNames = envNames.concat(webHook.environments);
        }
      }
      envNames = Array.from(new Set(envNames));
    }
    if (envNames.length == 0) {
      return services;
    } else {
      return services.filter(s => envNames.find(e => e == s['environment']))
    }
  }

  public fiterServicesWithoutWebHook(app: App, services: Service[]): Service[] {
    const webHookServices = this.filterServicesForWebHook(app, services);
    const webHooksToDelete = new Set(webHookServices);

    return services.filter(s => !webHooksToDelete.has(s));

  }

}

export default new QueueHelper();
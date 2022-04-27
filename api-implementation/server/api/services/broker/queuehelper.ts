import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;
import { Service } from '../../../../src/clients/solacecloud';

export class QueueHelper {
  public getAPIProductQueueName(app: App, apiProduct: APIProduct): string {
    if (app) {
      return `${app.internalName}-${apiProduct.name}`;
    } else {
      return `${apiProduct.name}`;
    }
  }

  public isAPIProductQueueRequired(apiProduct: APIProduct): boolean {
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
    }
    return apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging && apiProduct.clientOptions.guaranteedMessaging.requireQueue;
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
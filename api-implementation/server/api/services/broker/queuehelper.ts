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
}

export default new QueueHelper();
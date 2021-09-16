import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;

export class QueueHelper {
    public getAPIProductQueueName(app: App, apiProduct: APIProduct): string{
      return `${app.internalName}-${apiProduct.name}`;
    }

    public isAPIProductQueueRequired(apiProduct: APIProduct): boolean {
    // at the moment we require JMS or SMF protocols
    if (!apiProduct.protocols) {
      return false;
    }
    if (apiProduct.protocols.filter(e=>(e.name == 'jms' || e.name =='secure-jms' || e.name =='smf' || e.name == 'smfs')).length==0){
      return false;
    }
    return apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging && apiProduct.clientOptions.guaranteedMessaging.requireQueue;
  }

}

export default new QueueHelper();
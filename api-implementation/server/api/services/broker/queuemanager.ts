import L from '../../../common/logger';

import ACLManager from '../broker/aclmanager';
import ApiProductsService from '../apiProducts.service';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import ClientOptions = Components.Schemas.ClientOptions;

import { Service } from '../../../../src/clients/solacecloud';
import {
  AllService,
  MsgVpnQueue,
  MsgVpnQueueSubscription
} from '../../../../src/clients/sempv2';

import SempV2ClientFactory from '../broker/sempv2clientfactory';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export class QueueManager {
  public async createWebHookQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    await this.createQueues(app, services, apiProducts, ownerAttributes);
  }

  public async createAPIProductQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    for (const apiProduct of apiProducts) {
      const queueName: string = `${app.internalName}-${apiProduct.name}`;
      if (this.isAPIProductQueueRequired(apiProduct)) {
        await this.createQueues(app, services, [apiProduct], ownerAttributes, queueName, apiProduct.clientOptions);
      } else {
        await this.deleteQueues(app, services, queueName);
      }
    }
  }

  private async createQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes, queueName?: string, clientOptions?: ClientOptions): Promise<void> {
    L.info(`createQueueSubscriptions services: ${services}`);
    var subscribeExceptions: string[] = await ACLManager.getQueueSubscriptions(app, apiProducts, ownerAttributes);
    if (subscribeExceptions === undefined) {
      subscribeExceptions = [];
    }
    let objectName: string = app.internalName;
    if (queueName) {
      objectName = queueName;
    }
    // loop over services
    for (var service of services) {
      //create queues
      var sempV2Client = SempV2ClientFactory.getSEMPv2Client(service);
      var newQ: MsgVpnQueue = {
        queueName: objectName,
        msgVpnName: service.msgVpnName,
        ingressEnabled: true,
        egressEnabled: true,
        owner: app.credentials.secret.consumerKey,
        permission: MsgVpnQueue.permission.CONSUME
      };
      if (clientOptions && clientOptions.guaranteedMessaging) {
        newQ.accessType = (clientOptions.guaranteedMessaging.accessType.toUpperCase() == MsgVpnQueue.accessType.EXCLUSIVE) ?
          MsgVpnQueue.accessType.EXCLUSIVE : MsgVpnQueue.accessType.NON_EXCLUSIVE;
        newQ.maxTtl = clientOptions.guaranteedMessaging.maxTtl;
        newQ.maxMsgSpoolUsage = clientOptions.guaranteedMessaging.maxMsgSpoolUsage;
        newQ.respectTtlEnabled = (clientOptions.guaranteedMessaging.maxTtl > 0);
      } else {
        newQ.accessType = MsgVpnQueue.accessType.EXCLUSIVE;
        newQ.maxTtl = 86400;
        newQ.maxMsgSpoolUsage = 50;
        newQ.respectTtlEnabled = true;
      }
      try {
        var q = await AllService.getMsgVpnQueue(service.msgVpnName, objectName);
        var updateResponseMsgVpnQueue = await AllService.updateMsgVpnQueue(service.msgVpnName, objectName, newQ);
        L.debug(`createQueues updated ${app.internalName}`);
      } catch (e) {
        L.debug(`createQueues lookup  failed ${JSON.stringify(e)}`);
        try {
          var q = await AllService.createMsgVpnQueue(service.msgVpnName, newQ);
        } catch (e) {
          L.warn(`createQueues creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e.message);
        }
      }

      for (var subscription of subscribeExceptions) {
        var queueSubscription: MsgVpnQueueSubscription = {
          msgVpnName: service.msgVpnName,
          queueName: objectName,
          subscriptionTopic: subscription
        }
        try {
          var subResult = await AllService.getMsgVpnQueueSubscription(service.msgVpnName, objectName, encodeURIComponent(subscription));
        } catch (e) {
          L.debug(`createQueues subscription lookup  failed ${JSON.stringify(e)}`);
          try {
            var subResult = await AllService.createMsgVpnQueueSubscription(service.msgVpnName, objectName, queueSubscription);
          } catch (e) {
            L.warn(`createQueues subscription creation  failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e.message);
          }
        }
      }
    }
  }

  public async deleteAPIProductQueues(app: App, services: Service[], name: string) {

    for (const productName of app.apiProducts) {
      const apiProduct: APIProduct = await ApiProductsService.byName(productName);
      if (this.isAPIProductQueueRequired(apiProduct)) {
        const queueName: string = `${app.internalName}-${apiProduct.name}`;
        await this.deleteQueues(app, services, queueName);
      }
    }
    await this.deleteQueues(app, services, name);
  }

  public async deleteWebHookQueues(app: App, services: Service[], name: string) {
    await this.deleteQueues(app, services, name);
  }

  private async deleteQueues(app: App, services: Service[], name: string) {
    for (var service of services) {
      var sempv2Client = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        var getResponse = await AllService.deleteMsgVpnQueue(service.msgVpnName, name);
        L.info('Queue deleted');
      } catch (e) {
        if (!(e.body.meta.error.status == "NOT_FOUND")) {
          throw e;
        }

      }
    }
  }

  private isAPIProductQueueRequired(apiProduct: APIProduct): boolean {
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

export default new QueueManager();
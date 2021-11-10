import L from '../../../common/logger';

import QueueHelper from './queuehelper';
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
      const queueName: string = QueueHelper.getAPIProductQueueName(app, apiProduct);
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
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
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      var newQ: MsgVpnQueue = {
        queueName: objectName,
        msgVpnName: service.msgVpnName,
        ingressEnabled: true,
        egressEnabled: true,
        owner: app.credentials.secret.consumerKey,
        permission: MsgVpnQueue.permission.CONSUME
      };
      if (clientOptions && clientOptions.guaranteedMessaging) {
        newQ.accessType = (clientOptions.guaranteedMessaging.accessType.toLowerCase() == MsgVpnQueue.accessType.EXCLUSIVE.toLowerCase()) ?
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
        var q = await apiClient.getMsgVpnQueue(service.msgVpnName, objectName);
        var updateResponseMsgVpnQueue = await apiClient.updateMsgVpnQueue(service.msgVpnName, objectName, newQ);
        L.debug(`createQueues updated ${app.internalName}`);
      } catch (e) {
        L.debug(`createQueues lookup  failed ${JSON.stringify(e)}`);
        try {
          var q = await apiClient.createMsgVpnQueue(service.msgVpnName, newQ);
        } catch (e) {
          L.warn(`createQueues creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e.message);
        }
      }

      // timing problem - check queue is visible via SEMPv2
      let isError: boolean = true;
      for (let i = 0; i < 100; i++) {
        try {
          var q = await apiClient.getMsgVpnQueue(service.msgVpnName, objectName);
          isError = false;
          break;
        } catch (e) {
          L.debug(`createQueues lookup  failed ${JSON.stringify(e)}`);
          isError = true;
        }
      }
      if (isError){
        throw new ErrorResponseInternal(500, `Queue creation failed`);
      }

      for (var subscription of subscribeExceptions) {
        var queueSubscription: MsgVpnQueueSubscription = {
          msgVpnName: service.msgVpnName,
          queueName: objectName,
          subscriptionTopic: subscription
        }
        try {
          var subResult = await apiClient.getMsgVpnQueueSubscription(service.msgVpnName, objectName, encodeURIComponent(subscription));
        } catch (e) {
          L.debug(`createQueues subscription lookup  failed ${JSON.stringify(e)}`);
          try {
            var subResult = await apiClient.createMsgVpnQueueSubscription(service.msgVpnName, objectName, queueSubscription);
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
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
        const queueName: string = QueueHelper.getAPIProductQueueName(app, apiProduct);
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
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        var getResponse = await apiClient.deleteMsgVpnQueue(service.msgVpnName, name);
        L.info('Queue deleted');
      } catch (e) {
        if (!(e.body.meta.error.status == "NOT_FOUND")) {
          L.error('deleteQueues');
          L.error(e);
          throw e;
        }

      }
    }
  }

}

export default new QueueManager();
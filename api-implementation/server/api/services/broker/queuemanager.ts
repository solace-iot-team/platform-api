import L from '../../../common/logger';

import QueueHelper from './queuehelper';
import ACLManager from './aclmanager';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import ClientOptions = Components.Schemas.ClientOptions;

import MsgVpnQueue = Components.Schemas.MsgVpnQueue;
import MsgVpnQueueSubscription = Components.Schemas.MsgVpnQueueSubscription;


import BrokerUtils from './brokerutils';

import _ from 'lodash';
export class QueueManager {
  public async createWebHookQueue(app: App,
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnQueue> {
    const clientOpts = BrokerUtils.getAppAggregatedClientOptions(apiProducts);
    return await this.createQueue(app, apiProducts, ownerAttributes, undefined, clientOpts);
  }

  public async createAPIProductQueues(app: App,
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnQueue[]> {
    const queues: MsgVpnQueue[] = [];
    for (const apiProduct of apiProducts) {
      const queueName: string = QueueHelper.getAPIQueueName(app, apiProduct);
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
        const q = await this.createQueue(app, [apiProduct], ownerAttributes, queueName, apiProduct.clientOptions);
        if (q) {
          queues.push(q);
        }
      }
    }
    return queues;
  }
  public async createAPIQueues(app: App,
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnQueue[]> {
    const queues: MsgVpnQueue[] = [];
    for (const apiProduct of apiProducts) {
      for (const api of apiProduct.apis) {
        const queueName: string = QueueHelper.getAPIQueueName(app, apiProduct, api);
        if (QueueHelper.isAPIQueueRequired(apiProduct)) {
          const dummyProduct: APIProduct = _.cloneDeep(apiProduct);
          dummyProduct.apis = [api];
          const q = await this.createQueue(app, [dummyProduct], ownerAttributes, queueName, apiProduct.clientOptions);
          if (q) {
            queues.push(q);
          }
        }
      }
    }
    return queues;
  }

  private async createQueue(app: App,
    apiProducts: APIProduct[], ownerAttributes: Attributes, queueName?: string, clientOptions?: ClientOptions): Promise<MsgVpnQueue> {
    const subscriptions: MsgVpnQueueSubscription[] = await ACLManager.getQueueSubscriptions(app, apiProducts, ownerAttributes);
    if (subscriptions === undefined || subscriptions.length == 0) {
      return null;
    }
    let objectName: string = app.internalName;
    if (queueName) {
      objectName = queueName;
    }

    const environmentNames: string[] = [];
    for (const product of apiProducts) {
      product.environments.forEach((e: string) => {
        environmentNames.push(e);
      })
    }

    //create queues

    let accessType = 'exclusive';
    if (clientOptions?.guaranteedMessaging?.accessType) {
      accessType = clientOptions?.guaranteedMessaging?.accessType?.toLowerCase();
    }
    const newQ: MsgVpnQueue = {
      queueName: objectName,
      ingressEnabled: true,
      egressEnabled: true,
      owner: app.credentials.secret.consumerKey,
      permission: 'no-access',
      accessType: (accessType.toLowerCase() == 'exclusive') ?
        'exclusive' : 'non-exclusive',
      queueSubscriptions: subscriptions,
      environments: environmentNames
    };
    if (clientOptions && clientOptions.guaranteedMessaging) {
      newQ.maxTtl = clientOptions.guaranteedMessaging.maxTtl;
      newQ.maxMsgSpoolUsage = clientOptions.guaranteedMessaging.maxMsgSpoolUsage;
      newQ.respectTtlEnabled = (clientOptions.guaranteedMessaging.maxTtl > 0);
    } else {
      newQ.accessType = 'exclusive';
      newQ.maxTtl = 120;
      newQ.maxMsgSpoolUsage = 50;
      newQ.respectTtlEnabled = true;
    }
    return newQ;
  }

}

export default new QueueManager();
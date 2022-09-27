import L from '../../../common/logger';

import QueueHelper from './queuehelper';
import ACLManager from './aclmanager';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import ClientOptions = Components.Schemas.ClientOptions;
import Credentials = Components.Schemas.Credentials;
import MsgVpnQueue = Components.Schemas.MsgVpnQueue;
import MsgVpnQueueSubscription = Components.Schemas.MsgVpnQueueSubscription;


import BrokerUtils from './brokerutils';

import _ from 'lodash';
export class QueueManager {
  public async createWebHookQueue(app: App,
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnQueue> {
    const clientOpts = BrokerUtils.getAppAggregatedClientOptions(apiProducts);
    // consumer for a webhook queue is a syntehtic, internal user, the queue must allow non owner consumes
    const q = await this.createQueue(app, apiProducts, ownerAttributes, undefined, clientOpts);
    q.permission = 'consume';
    return q;
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
    const credentials = app.credentials as Credentials;
    // if there are multiple credentials it means the queue can not have an owner and the permission must be for non owners to consume messages
    const newQ: MsgVpnQueue = {
      queueName: objectName,
      ingressEnabled: true,
      egressEnabled: true,
      owner: (Array.isArray(app.credentials)&&app.credentials.length>0)?app.credentials[0].secret.consumerKey:credentials.secret.consumerKey,
      permission: Array.isArray(app.credentials)?'consume':'no-access',
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
import L from '../../../common/logger';

import QueueHelper from './queuehelper';
import ACLManager from '../broker/aclmanager';
import ApiProductsService from '../apiProducts.service';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import ClientOptions = Components.Schemas.ClientOptions;

import { Service } from '../../../../src/clients/solacecloud/models/Service';
import {
  AllService,
  MsgVpnQueue,
  MsgVpnQueueSubscription
} from '../../../../src/clients/sempv2';

import SempV2ClientFactory from '../broker/sempv2clientfactory';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import BrokerUtils from './brokerutils';
import APIProductsTypeHelper from '../../../../src/apiproductstypehelper';
import _ from 'lodash';
export class QueueManager {
  public async createWebHookQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    const clientOpts = BrokerUtils.getAppAggregatedClientOptions(apiProducts);
    const webHookServices: Service[] = QueueHelper.filterServicesForWebHook(app, services);
    L.info(`webHookServices ${webHookServices.length}`);
    await this.createQueues(app, webHookServices, apiProducts, ownerAttributes, undefined, clientOpts);

    const noWebHookServices: Service[] = QueueHelper.fiterServicesWithoutWebHook(app, services);
    L.info(`nowebHookServices ${noWebHookServices.length}`);
    await this.deleteQueues(noWebHookServices, app.internalName);
  }

  public async createAPIProductQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    for (const apiProduct of apiProducts) {
      const queueName: string = QueueHelper.getAPIQueueName(app, apiProduct);
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
        await this.createQueues(app, services, [apiProduct], ownerAttributes, queueName, apiProduct.clientOptions);
      } else {
        await this.deleteQueues(services, queueName);
      }
    }
  }
  public async createAPIQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<void> {
    for (const apiProduct of apiProducts) {
      for (const api of apiProduct.apis) {
        const queueName: string = QueueHelper.getAPIQueueName(app, apiProduct, api);
        if (QueueHelper.isAPIQueueRequired(apiProduct)) {
          const dummyProduct: APIProduct = _.cloneDeep(apiProduct);
          dummyProduct.apis = [api];
          await this.createQueues(app, services, [dummyProduct], ownerAttributes, queueName, apiProduct.clientOptions);
        } else {
          await this.deleteQueues(services, queueName);
        }
      }
    }
  }

  private async createQueues(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes, queueName?: string, clientOptions?: ClientOptions): Promise<void> {
    L.info(`createQueueSubscriptions services: ${services}`);
    const subscribeExceptions: string[] = await ACLManager.getQueueSubscriptions(app, apiProducts, ownerAttributes);
    if (subscribeExceptions === undefined || subscribeExceptions.length == 0) {
      return;
    }
    let objectName: string = app.internalName;
    if (queueName) {
      objectName = queueName;
    }
    // loop over services
    for (const service of services) {
      //create queues
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      const newQ: MsgVpnQueue = {
        queueName: objectName,
        msgVpnName: service.msgVpnName,
        ingressEnabled: true,
        egressEnabled: true,
        owner: app.credentials.secret.consumerKey,
        permission: MsgVpnQueue.permission.NO_ACCESS
      };
      if (clientOptions && clientOptions.guaranteedMessaging) {
        newQ.accessType = (clientOptions.guaranteedMessaging.accessType.toLowerCase() == MsgVpnQueue.accessType.EXCLUSIVE.toLowerCase()) ?
          MsgVpnQueue.accessType.EXCLUSIVE : MsgVpnQueue.accessType.NON_EXCLUSIVE;
        newQ.maxTtl = clientOptions.guaranteedMessaging.maxTtl;
        newQ.maxMsgSpoolUsage = clientOptions.guaranteedMessaging.maxMsgSpoolUsage;
        newQ.respectTtlEnabled = (clientOptions.guaranteedMessaging.maxTtl > 0);
      } else {
        newQ.accessType = MsgVpnQueue.accessType.EXCLUSIVE;
        newQ.maxTtl = 120;
        newQ.maxMsgSpoolUsage = 50;
        newQ.respectTtlEnabled = true;
      }
      try {
        const q = await apiClient.getMsgVpnQueue(service.msgVpnName, objectName);
        L.trace(`queue exists ${objectName}`);
        const disableQ: MsgVpnQueue = {
          queueName: objectName,
          msgVpnName: service.msgVpnName,
          ingressEnabled: false,
          egressEnabled: false
        };
        const disableQueueResponse = await apiClient.updateMsgVpnQueue(service.msgVpnName, objectName, disableQ);
        const updateResponseMsgVpnQueue = await apiClient.updateMsgVpnQueue(service.msgVpnName, objectName, newQ);
        L.debug(`createQueues updated ${app.internalName}`);
      } catch (e) {
        L.warn(`createQueues lookup  failed ${JSON.stringify(e)}`);
        try {
          const q = await apiClient.createMsgVpnQueue(service.msgVpnName, newQ);
        } catch (e) {
          L.warn(`createQueues creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e.message);
        }
      }

      for (const subscription of subscribeExceptions) {
        const queueSubscription: MsgVpnQueueSubscription = {
          msgVpnName: service.msgVpnName,
          queueName: objectName,
          subscriptionTopic: subscription
        }
        try {
          const subResult = await apiClient.getMsgVpnQueueSubscription(service.msgVpnName, objectName, encodeURIComponent(subscription));
        } catch (e) {
          L.debug(`createQueues subscription lookup  failed ${JSON.stringify(e)}`);
          try {
            const subResult = await apiClient.createMsgVpnQueueSubscription(service.msgVpnName, objectName, queueSubscription);
          } catch (e) {
            L.warn(`createQueues subscription creation  failed ${JSON.stringify(e)}`);
            throw new ErrorResponseInternal(500, e.message);
          }
        }
      }
    }
  }

  public async deleteAPIProductQueues(app: App, services: Service[], name: string) {

    for (const apiProductReference of app.apiProducts) {
      const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
      const apiProduct: APIProduct = await ApiProductsService.byReference(productName);
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
        const queueName: string = QueueHelper.getAPIQueueName(app, apiProduct);
        await this.deleteQueues(services, queueName);
      }
    }
  }

  public async deleteAPIQueues(app: App, services: Service[], name: string) {

    for (const apiProductReference of app.apiProducts) {
      const productName: string = APIProductsTypeHelper.apiProductReferenceToString(apiProductReference);
      const apiProduct: APIProduct = await ApiProductsService.byReference(productName);
      for (const api of apiProduct.apis) {
        if (QueueHelper.isAPIQueueRequired(apiProduct)) {
          const queueName: string = QueueHelper.getAPIQueueName(app, apiProduct, api);
          await this.deleteQueues(services, queueName);
        }
      }
    }
    //await this.deleteQueues(services, name);
  }
  public async deleteWebHookQueues(app: App, services: Service[], name: string) {
    await this.deleteQueues(services, name);
  }

  private async deleteQueues(services: Service[], name: string) {
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const getResponse = await apiClient.deleteMsgVpnQueue(service.msgVpnName, name);
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
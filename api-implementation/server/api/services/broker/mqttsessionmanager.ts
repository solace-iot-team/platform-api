import L from '../../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;

import { Service } from '../../../../src/clients/solacecloud/models/Service';

import {
  AllService,
  MsgVpnMqttSession,
  MsgVpnMqttSessionResponse,
 } from '../../../../src/clients/sempv2';

import SempV2ClientFactory from '../broker/sempv2clientfactory';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

import BrokerUtils from './brokerutils';
import {BrokerResourceManager} from './brokerresourcemanager';

class MQTTSessionManager implements BrokerResourceManager<void> {
  public async create(app: App, services: Service[],
    apiProducts: APIProduct[]): Promise<void> {
    const objectName: string = app.internalName;
    if (!BrokerUtils.isMQTTSessionRequired(apiProducts)) {
      return;
    }
    const clientOptions = BrokerUtils.getAppAggregatedClientOptions(apiProducts);
    // loop over services
    for (const service of services) {
      //create queues
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);

      const newSession: MsgVpnMqttSession = {
        mqttSessionClientId: objectName,
        msgVpnName: service.msgVpnName,
        enabled: true,
        mqttSessionVirtualRouter: MsgVpnMqttSession.mqttSessionVirtualRouter.PRIMARY,
        owner: app.credentials.secret.consumerKey,
      };
      if (clientOptions && clientOptions.guaranteedMessaging) {
        newSession.queueMaxTtl = clientOptions.guaranteedMessaging.maxTtl;
        newSession.queueMaxMsgSpoolUsage = clientOptions.guaranteedMessaging.maxMsgSpoolUsage;
        newSession.queueRespectTtlEnabled = (clientOptions.guaranteedMessaging.maxTtl > 0);
      } else {
        newSession.queueMaxTtl = 120;
        newSession.queueMaxMsgSpoolUsage = 50;
        newSession.queueRespectTtlEnabled = true;
      }
      try {
        const q = await apiClient.getMsgVpnMqttSession(service.msgVpnName, objectName, MsgVpnMqttSession.mqttSessionVirtualRouter.PRIMARY) as MsgVpnMqttSessionResponse;
        if (q.data) {
          q.data.enabled = false;
          const disableResponseMsgVpnQMqttSession = await apiClient.updateMsgVpnMqttSession(service.msgVpnName, objectName, MsgVpnMqttSession.mqttSessionVirtualRouter.PRIMARY, q.data);
        }
        const updateResponseMsgVpnQMqttSession = await apiClient.updateMsgVpnMqttSession(service.msgVpnName, objectName, MsgVpnMqttSession.mqttSessionVirtualRouter.PRIMARY, newSession);
        L.debug(`mqt session updated ${app.internalName}`);
      } catch (e) {
        L.debug(`lookup  failed ${JSON.stringify(e)}`);
        try {
          const q = await apiClient.createMsgVpnMqttSession(service.msgVpnName, newSession);
        } catch (e) {
          L.error(`creation  failed ${JSON.stringify(e)}`);
          throw new ErrorResponseInternal(500, e.message);
        }
      }
    }
  }
  public async delete(app: App, services: Service[]): Promise<void> {
    const name = app.internalName;
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const getResponse = await apiClient.deleteMsgVpnMqttSession(service.msgVpnName, name, MsgVpnMqttSession.mqttSessionVirtualRouter.PRIMARY);
        L.info('MQTT Session deleted');
      } catch (e) {
        if (!(e.body.meta.error.status == "NOT_FOUND")) {
          L.error('delete MQTT Session');
          L.error(e);
          throw e;
        }

      }
    }
  }
}
export default new MQTTSessionManager;
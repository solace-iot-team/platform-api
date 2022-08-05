import L from '../../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;


import MsgVpnMqttSession = Components.Schemas.MsgVpnMqttSession;

import { ErrorResponseInternal } from '../../middlewares/error.handler';

import BrokerUtils from './brokerutils';

class MQTTSessionManager {
  public async create(app: App,
    apiProducts: APIProduct[], environmentNames: string[]): Promise<MsgVpnMqttSession> {
    const objectName: string = app.internalName;
    if (!BrokerUtils.isMQTTSessionRequired(apiProducts)) {
      L.info('no mqtt session required');
      return;
    }
    const clientOptions = BrokerUtils.getAppAggregatedClientOptions(apiProducts);

    const newSession: MsgVpnMqttSession = {
      mqttSessionClientId: objectName,
      enabled: true,
      mqttSessionVirtualRouter: 'primary',
      owner: app.credentials.secret.consumerKey,
      environments: environmentNames
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
    return newSession;
  }

}
export default new MQTTSessionManager;
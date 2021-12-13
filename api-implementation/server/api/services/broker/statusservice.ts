import App = Components.Schemas.App;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;
import AppEnvironmentStatus = Components.Schemas.AppEnvironmentStatus;
import AppConnection = Components.Schemas.AppConnection;
import {
  AllService,
} from '../../../../src/clients/sempv2monitor/services/AllService';
import {MsgVpnClientsResponse} from '../../../../src/clients/sempv2monitor/models/MsgVpnClientsResponse';
import {MsgVpnClientConnectionsResponse} from '../../../../src/clients/sempv2monitor/models/MsgVpnClientConnectionsResponse';


import SempV2MonitorFactory from '../broker/sempv2monitorfactory';

import BrokerUtils from './brokerutils';

class StatusService {
  async getAppStatus(app: App) : Promise<AppConnectionStatus> {
    const services = await BrokerUtils.getServicesByApp(app);
    const envs: AppEnvironmentStatus[] = [];
    for (const service of services) {
      const env: AppEnvironmentStatus = {
        name: 'dev',
        connections: [],
      }
      const apiClient: AllService = SempV2MonitorFactory.getSEMPv2Client(service);
      const response: MsgVpnClientsResponse = await apiClient.getMsgVpnClients(service.msgVpnName, 100, null, [`clientUsername==${app.credentials.secret.consumerKey}`]);
      for (const c of response.data){
        const clientConn: MsgVpnClientConnectionsResponse = await apiClient.getMsgVpnClientConnections(service.msgVpnName, encodeURIComponent(c.clientName), 100);
        const conn: AppConnection = {
          clientAddress: c.clientAddress,
          uptime: c.uptime,
          state: clientConn.data[0].tcpState.toUpperCase(),
          roundtripTime: clientConn.data[0].smoothedRoundTripTime,
        }
        env.connections.push(conn);
      }
      envs.push(env);
    }
    const status: AppConnectionStatus = {};
    status.environments = envs;
    return status;
  }
}

export default new StatusService();
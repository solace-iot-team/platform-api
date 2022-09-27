import L from '../../../common/logger';

import App = Components.Schemas.App;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;
import AppEnvironmentStatus = Components.Schemas.AppEnvironmentStatus;
import AppConnection = Components.Schemas.AppConnection;
import WebHookStatus = Components.Schemas.WebHookStatus;
import WebHook = Components.Schemas.WebHook;
import QueueStatus = Components.Schemas.QueueStatus;
import EnvironmentResponse = Components.Schemas.EnvironmentResponse;
import { ErrorResponseInternal } from '../../middlewares/error.handler';

import {
  AllService,
} from '../../../../src/clients/sempv2monitor/services/AllService';
import { MsgVpnClientsResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnClientsResponse';
import { MsgVpnRestDeliveryPointsResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnRestDeliveryPointsResponse';
import { MsgVpnRestDeliveryPointRestConsumerResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnRestDeliveryPointRestConsumerResponse';
import { MsgVpnClientConnectionsResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnClientConnectionsResponse';
import { MsgVpnQueueResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnQueueResponse';
import { MsgVpnQueuesResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnQueuesResponse';
import { MsgVpnQueueTxFlowsResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnQueueTxFlowsResponse';

import { MsgVpnRestDeliveryPointQueueBindingResponse } from '../../../../src/clients/sempv2monitor/models/MsgVpnRestDeliveryPointQueueBindingResponse';


import { Service } from '../../../../src/clients/solacecloud/models/Service';

import SempV2MonitorFactory from '../broker/sempv2monitorfactory';

import BrokerUtils from './brokerutils';

import { Cache, CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { ProtocolMapper } from '../../../../src/protocolmapper';


const connectionStatusCache = new CacheContainer(new MemoryStorage());
const queueStatusCache = new CacheContainer(new MemoryStorage());

class StatusService {
  async getAppStatus(app: App): Promise<AppConnectionStatus> {

    const environments: EnvironmentResponse[] = await BrokerUtils.getEnvironmentObjects(app);
    const envs: AppEnvironmentStatus[] = [];
    for (const currEnv of environments) {
      const env: AppEnvironmentStatus = {
        name: currEnv.name,
        displayName: currEnv.displayName,
      }

      const services = await BrokerUtils.getServices([currEnv.name]);

      for (const service of services) {
        const webHooks: WebHookStatus[] = await this.getWebHookStatus(app, service, currEnv.name);
        if (webHooks.length > 0) {
          env.webHooks = webHooks;
        }
        const connections: AppConnection[] = await this.getConnectionStatus(app, service);
        if (connections.length > 0) {
          env.connections = connections;
        }
        const queues: QueueStatus[] = await this.getQueueStatus(app, service);
        if (queues.length > 0) {
          env.queues = queues;
        }

      }

      envs.push(env);
    }
    const status: AppConnectionStatus = {};
    status.environments = envs;
    return status;
  }


  @Cache(connectionStatusCache, { ttl: 20 })
  private async getConnectionStatus(app: App, service: Service): Promise<AppConnection[]> {
    try {
      const connections: AppConnection[] = [];
      const apiClient: AllService = SempV2MonitorFactory.getSEMPv2Client(service);
      const response: MsgVpnClientsResponse = await apiClient.getMsgVpnClients(service.msgVpnName, 100, null, [`aclProfileName==${app.internalName}`]);
      for (const c of response.data) {
        const conn: AppConnection = {
          clientAddress: c.clientAddress,
          uptime: c.uptime,
          protocol: ProtocolMapper.mapSolaceClientNameToProtocol(c.clientName, c.tlsVersion !== undefined)
        }
        try {
          const clientConn: MsgVpnClientConnectionsResponse = await apiClient.getMsgVpnClientConnections(service.msgVpnName, encodeURIComponent(c.clientName), 100);
          conn.state = clientConn.data[0].tcpState.toUpperCase();
          conn.roundtripTime = clientConn.data[0].smoothedRoundTripTime;
        } catch (e) {
          L.info('could not retrieve connection details');
          L.info(JSON.stringify(e));
        }
        connections.push(conn);
      }
      return connections;
    } catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(500, 'Error retrieving connection status');
    }
  }

  private async getWebHookStatus(app: App, service: Service, envName: string): Promise<WebHookStatus[]> {
    try {
      const webHooks: WebHookStatus[] = [];
      const apiClient: AllService = SempV2MonitorFactory.getSEMPv2Client(service);
      const response: MsgVpnRestDeliveryPointsResponse = await apiClient.getMsgVpnRestDeliveryPoints(service.msgVpnName, 100, null, [`restDeliveryPointName==${app.internalName}`]);

      for (const c of response.data) {
        const consumerStatus: MsgVpnRestDeliveryPointRestConsumerResponse = await apiClient.getMsgVpnRestDeliveryPointRestConsumer(service.msgVpnName, app.internalName, 'Consumer');
        const bindingStatus: MsgVpnRestDeliveryPointQueueBindingResponse = await apiClient.getMsgVpnRestDeliveryPointQueueBinding(service.msgVpnName, app.internalName, app.internalName);
        const q: MsgVpnQueueResponse = await apiClient.getMsgVpnQueue(service.msgVpnName, encodeURIComponent(app.internalName));
        const up: boolean = c.up && (consumerStatus.data && consumerStatus.data.up) && (bindingStatus.data && bindingStatus.data.up);
        const wh: WebHook = this.getWebHook(app, envName);
        const conn: WebHookStatus = {
          up: up,
          failureReason: up ? '' : `${c.lastFailureReason} (${consumerStatus.data.lastConnectionFailureReason})`,
          lastFailureTime: c.lastFailureTime,
          messagesQueued: q.collections.msgs.count,
          messagesQueuedMB: (q.data.msgSpoolUsage / 1048576),
          uri: wh.uri,
          name: wh.name?wh.name:wh.uri,
        }
        webHooks.push(conn);
      }
      return webHooks;
    } catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(500, 'Error retrieving web hook status');;
    }
  }

  @Cache(queueStatusCache, { ttl: 20 })
  private async getQueueStatus(app: App, service: Service): Promise<QueueStatus[]> {
    try {
      const queues: QueueStatus[] = [];
      const apiClient: AllService = SempV2MonitorFactory.getSEMPv2Client(service);
      const response: MsgVpnQueuesResponse = await apiClient.getMsgVpnQueues(service.msgVpnName, 100, null, [`queueName==${app.internalName}-*`]);
      let idx = 0;
      for (const c of response.data) {
        const txFlows: MsgVpnQueueTxFlowsResponse = await apiClient.getMsgVpnQueueTxFlows(service.msgVpnName, encodeURIComponent(c.queueName), 100, null, null, ['flowId']);
        const conn: QueueStatus = {
          messagesQueued: response.collections[idx++].msgs.count,
          messagesQueuedMB: (c.msgSpoolUsage / 1048576),
          consumerCount: txFlows.data ? txFlows.data.length : 0,
          name: c.queueName,
        }
        queues.push(conn);
      }
      return queues;
    } catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(500, 'Error retrieving queue status');
    }
  }

  private getWebHook(app: App, envName: string): WebHook {
    let wh: WebHook;
    // try to locate specific web hook for this environment
    wh = app.webHooks.find(w => w.environments && w.environments.find(e => e == envName));
    if (!wh) {
      // fall back to find webhook without environment, this matches all environments
      wh = app.webHooks.find(w => (w.environments === undefined || w.environments.length == 0));
    }
    if (wh) {
      return wh;
    } else {
      return null;
    }
  }
}


export default new StatusService();
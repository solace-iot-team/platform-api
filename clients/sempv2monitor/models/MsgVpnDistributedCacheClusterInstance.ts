/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstanceCounter } from './MsgVpnDistributedCacheClusterInstanceCounter';
import type { MsgVpnDistributedCacheClusterInstanceRate } from './MsgVpnDistributedCacheClusterInstanceRate';

export type MsgVpnDistributedCacheClusterInstance = {
    /**
     * Indicates whether auto-start for the Cache Instance is enabled, and the Cache Instance will automatically attempt to transition from the Stopped operational state to Up whenever it restarts or reconnects to the message broker.
     */
    autoStartEnabled?: boolean;
    /**
     * The peak of the one minute average of the data message rate received by the Cache Instance, in bytes per second (B/sec). Available since 2.13.
     */
    averageDataRxBytePeakRate?: number;
    /**
     * The one minute average of the data message rate received by the Cache Instance, in bytes per second (B/sec). Available since 2.13.
     */
    averageDataRxByteRate?: number;
    /**
     * The peak of the one minute average of the data message rate received by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    averageDataRxMsgPeakRate?: number;
    /**
     * The one minute average of the data message rate received by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    averageDataRxMsgRate?: number;
    /**
     * The peak of the one minute average of the data message rate transmitted by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    averageDataTxMsgPeakRate?: number;
    /**
     * The one minute average of the data message rate transmitted by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    averageDataTxMsgRate?: number;
    /**
     * The peak of the one minute average of the request rate received by the Cache Instance, in requests per second (req/sec). Available since 2.13.
     */
    averageRequestRxPeakRate?: number;
    /**
     * The one minute average of the request rate received by the Cache Instance, in requests per second (req/sec). Available since 2.13.
     */
    averageRequestRxRate?: number;
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    counter?: MsgVpnDistributedCacheClusterInstanceCounter;
    /**
     * The data message peak rate received by the Cache Instance, in bytes per second (B/sec). Available since 2.13.
     */
    dataRxBytePeakRate?: number;
    /**
     * The data message rate received by the Cache Instance, in bytes per second (B/sec). Available since 2.13.
     */
    dataRxByteRate?: number;
    /**
     * The data message peak rate received by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    dataRxMsgPeakRate?: number;
    /**
     * The data message rate received by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    dataRxMsgRate?: number;
    /**
     * The data message peak rate transmitted by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    dataTxMsgPeakRate?: number;
    /**
     * The data message rate transmitted by the Cache Instance, in messages per second (msg/sec). Available since 2.13.
     */
    dataTxMsgRate?: number;
    /**
     * Indicates whether the Cache Instance is enabled.
     */
    enabled?: boolean;
    /**
     * The name of the Cache Instance.
     */
    instanceName?: string;
    /**
     * The timestamp of when the Cache Instance last registered with the message broker. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastRegisteredTime?: number;
    /**
     * The timestamp of the last heartbeat message received from the Cache Instance. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastRxHeartbeatTime?: number;
    /**
     * The timestamp of the last request for setting the lost message indication received from the Cache Instance. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastRxSetLostMsgTime?: number;
    /**
     * The reason why the Cache Instance was last stopped.
     */
    lastStoppedReason?: string;
    /**
     * The timestamp of when the Cache Instance was last stopped. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastStoppedTime?: number;
    /**
     * The timestamp of the last request for clearing the lost message indication transmitted to the Cache Instance. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastTxClearLostMsgTime?: number;
    /**
     * The memory usage of the Cache Instance, in megabytes (MB).
     */
    memoryUsage?: number;
    /**
     * The number of messages cached for the Cache Instance. Available since 2.13.
     */
    msgCount?: number;
    /**
     * The number of messages cached peak for the Cache Instance. Available since 2.13.
     */
    msgPeakCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether one or more messages were lost by the Cache Instance.
     */
    msgsLost?: boolean;
    rate?: MsgVpnDistributedCacheClusterInstanceRate;
    /**
     * The received request message queue depth for the Cache Instance. Available since 2.13.
     */
    requestQueueDepthCount?: number;
    /**
     * The received request message queue depth peak for the Cache Instance. Available since 2.13.
     */
    requestQueueDepthPeakCount?: number;
    /**
     * The request peak rate received by the Cache Instance, in requests per second (req/sec). Available since 2.13.
     */
    requestRxPeakRate?: number;
    /**
     * The request rate received by the Cache Instance, in requests per second (req/sec). Available since 2.13.
     */
    requestRxRate?: number;
    /**
     * The operational state of the Cache Instance. The allowed values and their meaning are:
     *
     * <pre>
     * "invalid" - The Cache Instance state is invalid.
     * "down" - The Cache Instance is operationally down.
     * "stopped" - The Cache Instance has stopped processing cache requests.
     * "stopped-lost-msg" - The Cache Instance has stopped due to a lost message.
     * "register" - The Cache Instance is registering with the broker.
     * "config-sync" - The Cache Instance is synchronizing its configuration with the broker.
     * "cluster-sync" - The Cache Instance is synchronizing its messages with the Cache Cluster.
     * "up" - The Cache Instance is operationally up.
     * "backup" - The Cache Instance is backing up its messages to disk.
     * "restore" - The Cache Instance is restoring its messages from disk.
     * "not-available" - The Cache Instance state is not available.
     * </pre>
     *
     */
    state?: string;
    /**
     * Indicates whether stop-on-lost-message is enabled, and the Cache Instance will transition to the Stopped operational state upon losing a message. When Stopped, it cannot accept or respond to cache requests, but continues to cache messages.
     */
    stopOnLostMsgEnabled?: boolean;
    /**
     * The number of topics cached for the Cache Instance. Available since 2.13.
     */
    topicCount?: number;
    /**
     * The number of topics cached peak for the Cache Instance. Available since 2.13.
     */
    topicPeakCount?: number;
}

export namespace MsgVpnDistributedCacheClusterInstance {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstance';


}
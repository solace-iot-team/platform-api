/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnDistributedCacheClusterInstance {
    /**
     * Enable or disable auto-start for the Cache Instance. When enabled, the Cache Instance will automatically attempt to transition from the Stopped operational state to Up whenever it restarts or reconnects to the message broker. The default value is `false`.
     */
    autoStartEnabled?: boolean;
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    /**
     * Enable or disable the Cache Instance. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the Cache Instance.
     */
    instanceName?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Enable or disable stop-on-lost-message for the Cache Instance. When enabled, the Cache Instance will transition to the stopped operational state upon losing a message. When stopped, it cannot accept or respond to cache requests, but continues to cache messages. The default value is `true`.
     */
    stopOnLostMsgEnabled?: boolean;
}

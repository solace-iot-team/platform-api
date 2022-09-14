/* eslint-disable */


export type MsgVpnDistributedCacheClusterInstance = {
    /**
     * Enable or disable auto-start for the Cache Instance. When enabled, the Cache Instance will automatically attempt to transition from the Stopped operational state to Up whenever it restarts or reconnects to the message broker. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
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
     * Enable or disable the Cache Instance. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
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
     * Enable or disable stop-on-lost-message for the Cache Instance. When enabled, the Cache Instance will transition to the stopped operational state upon losing a message. When stopped, it cannot accept or respond to cache requests, but continues to cache messages. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    stopOnLostMsgEnabled?: boolean;
}

export namespace MsgVpnDistributedCacheClusterInstance {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstance';


}
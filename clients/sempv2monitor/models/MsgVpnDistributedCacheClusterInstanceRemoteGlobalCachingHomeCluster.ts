/* eslint-disable */


export type MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster = {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The number of cache requests forwarded to the remote Home Cache Cluster.
     */
    cacheRequestForwardedCount?: number;
    /**
     * The number of cache requests received from the remote Home Cache Cluster.
     */
    cacheRequestRxCount?: number;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    /**
     * The number of heartbeat messages received from the remote Home Cache Cluster.
     */
    heartbeatRxCount?: number;
    /**
     * Indicates whether the operational state of the heartbeat with the remote Home Cache Cluster is up.
     */
    heartbeatUp?: boolean;
    /**
     * The name of the remote Home Cache Cluster.
     */
    homeClusterName?: string;
    /**
     * The name of the Cache Instance.
     */
    instanceName?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster';


}
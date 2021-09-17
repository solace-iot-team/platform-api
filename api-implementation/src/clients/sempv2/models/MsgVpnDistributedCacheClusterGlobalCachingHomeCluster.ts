/* eslint-disable */


export type MsgVpnDistributedCacheClusterGlobalCachingHomeCluster = {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    /**
     * The name of the remote Home Cache Cluster.
     */
    homeClusterName?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnDistributedCacheClusterGlobalCachingHomeCluster {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterGlobalCachingHomeCluster';


}
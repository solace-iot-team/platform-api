/* eslint-disable */


export type MsgVpnDistributedCacheClusterInstanceRemoteTopic = {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    /**
     * Indicates whether the type of the remote Topic is global.
     */
    globalTopic?: boolean;
    /**
     * The name of the remote Home Cache Cluster.
     */
    homeClusterName?: string;
    /**
     * The name of the Cache Instance.
     */
    instanceName?: string;
    /**
     * The number of messages cached for the remote Topic.
     */
    msgCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether the remote Topic is suspect due to the remote Home Cache Cluster being in the lost message state.
     */
    suspect?: boolean;
    /**
     * The value of the remote Topic.
     */
    topic?: string;
}

export namespace MsgVpnDistributedCacheClusterInstanceRemoteTopic {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRemoteTopic';


}
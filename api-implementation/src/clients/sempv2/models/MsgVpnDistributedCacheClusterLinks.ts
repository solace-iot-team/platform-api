/* eslint-disable */


export type MsgVpnDistributedCacheClusterLinks = {
    /**
     * The URI of this Cache Cluster's collection of Home Cache Cluster objects.
     */
    globalCachingHomeClustersUri?: string;
    /**
     * The URI of this Cache Cluster's collection of Cache Instance objects.
     */
    instancesUri?: string;
    /**
     * The URI of this Cache Cluster's collection of Topic objects.
     */
    topicsUri?: string;
    /**
     * The URI of this Cache Cluster object.
     */
    uri?: string;
}

export namespace MsgVpnDistributedCacheClusterLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterLinks';


}
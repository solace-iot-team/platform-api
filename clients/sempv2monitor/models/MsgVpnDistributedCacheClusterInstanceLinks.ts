/* eslint-disable */


export type MsgVpnDistributedCacheClusterInstanceLinks = {
    /**
     * The URI of this Cache Instance's collection of Remote Home Cache Cluster objects.
     */
    remoteGlobalCachingHomeClustersUri?: string;
    /**
     * The URI of this Cache Instance's collection of Remote Topic objects.
     */
    remoteTopicsUri?: string;
    /**
     * The URI of this Cache Instance object.
     */
    uri?: string;
}

export namespace MsgVpnDistributedCacheClusterInstanceLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceLinks';


}
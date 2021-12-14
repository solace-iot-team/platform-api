/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster } from './MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster';
import type { MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterCollections } from './MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterCollections';
import type { MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterLinks } from './MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterResponse = {
    collections?: MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterCollections;
    data?: MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster;
    links?: MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterResponse';


}
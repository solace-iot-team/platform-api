/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster } from './MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster';
import type { MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterCollections } from './MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterCollections';
import type { MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterLinks } from './MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClustersResponse = {
    collections?: Array<MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterCollections>;
    data?: Array<MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeCluster>;
    links?: Array<MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClusterLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClustersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRemoteGlobalCachingHomeClustersResponse';


}
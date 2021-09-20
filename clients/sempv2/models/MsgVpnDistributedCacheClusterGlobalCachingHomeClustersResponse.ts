/* eslint-disable */


import type { MsgVpnDistributedCacheClusterGlobalCachingHomeCluster } from './MsgVpnDistributedCacheClusterGlobalCachingHomeCluster';
import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterLinks } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterGlobalCachingHomeClustersResponse = {
    data?: Array<MsgVpnDistributedCacheClusterGlobalCachingHomeCluster>;
    links?: Array<MsgVpnDistributedCacheClusterGlobalCachingHomeClusterLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterGlobalCachingHomeClustersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterGlobalCachingHomeClustersResponse';


}
/* eslint-disable */


import type { MsgVpnDistributedCacheClusterGlobalCachingHomeCluster } from './MsgVpnDistributedCacheClusterGlobalCachingHomeCluster';
import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterLinks } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterGlobalCachingHomeClusterResponse = {
    data?: MsgVpnDistributedCacheClusterGlobalCachingHomeCluster;
    links?: MsgVpnDistributedCacheClusterGlobalCachingHomeClusterLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterGlobalCachingHomeClusterResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterGlobalCachingHomeClusterResponse';


}
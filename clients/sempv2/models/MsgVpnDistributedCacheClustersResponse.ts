/* eslint-disable */


import type { MsgVpnDistributedCacheCluster } from './MsgVpnDistributedCacheCluster';
import type { MsgVpnDistributedCacheClusterLinks } from './MsgVpnDistributedCacheClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClustersResponse = {
    data?: Array<MsgVpnDistributedCacheCluster>;
    links?: Array<MsgVpnDistributedCacheClusterLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClustersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClustersResponse';


}
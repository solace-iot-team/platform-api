/* eslint-disable */


import type { MsgVpnDistributedCacheCluster } from './MsgVpnDistributedCacheCluster';
import type { MsgVpnDistributedCacheClusterCollections } from './MsgVpnDistributedCacheClusterCollections';
import type { MsgVpnDistributedCacheClusterLinks } from './MsgVpnDistributedCacheClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterResponse = {
    collections?: MsgVpnDistributedCacheClusterCollections;
    data?: MsgVpnDistributedCacheCluster;
    links?: MsgVpnDistributedCacheClusterLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterResponse';


}
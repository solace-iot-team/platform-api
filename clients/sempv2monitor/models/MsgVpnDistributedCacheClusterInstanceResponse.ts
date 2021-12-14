/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstance } from './MsgVpnDistributedCacheClusterInstance';
import type { MsgVpnDistributedCacheClusterInstanceCollections } from './MsgVpnDistributedCacheClusterInstanceCollections';
import type { MsgVpnDistributedCacheClusterInstanceLinks } from './MsgVpnDistributedCacheClusterInstanceLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstanceResponse = {
    collections?: MsgVpnDistributedCacheClusterInstanceCollections;
    data?: MsgVpnDistributedCacheClusterInstance;
    links?: MsgVpnDistributedCacheClusterInstanceLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterInstanceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceResponse';


}
/* eslint-disable */


import type { MsgVpnDistributedCache } from './MsgVpnDistributedCache';
import type { MsgVpnDistributedCacheCollections } from './MsgVpnDistributedCacheCollections';
import type { MsgVpnDistributedCacheLinks } from './MsgVpnDistributedCacheLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCachesResponse = {
    collections?: Array<MsgVpnDistributedCacheCollections>;
    data?: Array<MsgVpnDistributedCache>;
    links?: Array<MsgVpnDistributedCacheLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCachesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCachesResponse';


}
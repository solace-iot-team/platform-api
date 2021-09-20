/* eslint-disable */


import type { MsgVpnDistributedCache } from './MsgVpnDistributedCache';
import type { MsgVpnDistributedCacheLinks } from './MsgVpnDistributedCacheLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheResponse = {
    data?: MsgVpnDistributedCache;
    links?: MsgVpnDistributedCacheLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheResponse';


}
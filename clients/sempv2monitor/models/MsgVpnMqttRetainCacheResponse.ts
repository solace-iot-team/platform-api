/* eslint-disable */


import type { MsgVpnMqttRetainCache } from './MsgVpnMqttRetainCache';
import type { MsgVpnMqttRetainCacheCollections } from './MsgVpnMqttRetainCacheCollections';
import type { MsgVpnMqttRetainCacheLinks } from './MsgVpnMqttRetainCacheLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttRetainCacheResponse = {
    collections?: MsgVpnMqttRetainCacheCollections;
    data?: MsgVpnMqttRetainCache;
    links?: MsgVpnMqttRetainCacheLinks;
    meta: SempMeta;
}

export namespace MsgVpnMqttRetainCacheResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttRetainCacheResponse';


}
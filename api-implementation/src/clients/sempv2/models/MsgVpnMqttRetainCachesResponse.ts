/* eslint-disable */


import type { MsgVpnMqttRetainCache } from './MsgVpnMqttRetainCache';
import type { MsgVpnMqttRetainCacheLinks } from './MsgVpnMqttRetainCacheLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttRetainCachesResponse = {
    data?: Array<MsgVpnMqttRetainCache>;
    links?: Array<MsgVpnMqttRetainCacheLinks>;
    meta: SempMeta;
}

export namespace MsgVpnMqttRetainCachesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttRetainCachesResponse';


}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnMqttRetainCache } from './MsgVpnMqttRetainCache';
import type { MsgVpnMqttRetainCacheLinks } from './MsgVpnMqttRetainCacheLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnMqttRetainCacheResponse {
    data?: MsgVpnMqttRetainCache;
    links?: MsgVpnMqttRetainCacheLinks;
    meta: SempMeta;
}

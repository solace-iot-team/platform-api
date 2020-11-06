/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnDistributedCache } from './MsgVpnDistributedCache';
import type { MsgVpnDistributedCacheLinks } from './MsgVpnDistributedCacheLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnDistributedCacheResponse {
    data?: MsgVpnDistributedCache;
    links?: MsgVpnDistributedCacheLinks;
    meta: SempMeta;
}

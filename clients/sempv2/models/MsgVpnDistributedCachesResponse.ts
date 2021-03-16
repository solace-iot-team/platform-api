/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnDistributedCache } from './MsgVpnDistributedCache';
import type { MsgVpnDistributedCacheLinks } from './MsgVpnDistributedCacheLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCachesResponse = {
    data?: Array<MsgVpnDistributedCache>;
    links?: Array<MsgVpnDistributedCacheLinks>;
    meta: SempMeta;
}

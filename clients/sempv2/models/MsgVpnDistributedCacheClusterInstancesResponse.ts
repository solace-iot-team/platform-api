/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnDistributedCacheClusterInstance } from './MsgVpnDistributedCacheClusterInstance';
import type { MsgVpnDistributedCacheClusterInstanceLinks } from './MsgVpnDistributedCacheClusterInstanceLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstancesResponse = {
    data?: Array<MsgVpnDistributedCacheClusterInstance>;
    links?: Array<MsgVpnDistributedCacheClusterInstanceLinks>;
    meta: SempMeta;
}

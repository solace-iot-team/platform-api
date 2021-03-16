/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnDistributedCacheCluster } from './MsgVpnDistributedCacheCluster';
import type { MsgVpnDistributedCacheClusterLinks } from './MsgVpnDistributedCacheClusterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClustersResponse = {
    data?: Array<MsgVpnDistributedCacheCluster>;
    links?: Array<MsgVpnDistributedCacheClusterLinks>;
    meta: SempMeta;
}

/* eslint-disable */


import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix';
import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixLinks } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixesResponse = {
    data?: Array<MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix>;
    links?: Array<MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixesResponse';


}
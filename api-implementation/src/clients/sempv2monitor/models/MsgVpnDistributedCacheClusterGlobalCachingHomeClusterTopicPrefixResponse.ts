/* eslint-disable */


import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix';
import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixCollections } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixCollections';
import type { MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixLinks } from './MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixResponse = {
    collections?: MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixCollections;
    data?: MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix;
    links?: MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefixResponse';


}
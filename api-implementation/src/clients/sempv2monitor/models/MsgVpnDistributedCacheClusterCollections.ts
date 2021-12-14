/* eslint-disable */


import type { MsgVpnDistributedCacheClusterCollectionsGlobalcachinghomeclusters } from './MsgVpnDistributedCacheClusterCollectionsGlobalcachinghomeclusters';
import type { MsgVpnDistributedCacheClusterCollectionsInstances } from './MsgVpnDistributedCacheClusterCollectionsInstances';
import type { MsgVpnDistributedCacheClusterCollectionsTopics } from './MsgVpnDistributedCacheClusterCollectionsTopics';

export type MsgVpnDistributedCacheClusterCollections = {
    globalCachingHomeClusters?: MsgVpnDistributedCacheClusterCollectionsGlobalcachinghomeclusters;
    instances?: MsgVpnDistributedCacheClusterCollectionsInstances;
    topics?: MsgVpnDistributedCacheClusterCollectionsTopics;
}

export namespace MsgVpnDistributedCacheClusterCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterCollections';


}
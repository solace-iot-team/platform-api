/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstanceCollectionsRemoteglobalcachinghomeclusters } from './MsgVpnDistributedCacheClusterInstanceCollectionsRemoteglobalcachinghomeclusters';
import type { MsgVpnDistributedCacheClusterInstanceCollectionsRemotetopics } from './MsgVpnDistributedCacheClusterInstanceCollectionsRemotetopics';

export type MsgVpnDistributedCacheClusterInstanceCollections = {
    remoteGlobalCachingHomeClusters?: MsgVpnDistributedCacheClusterInstanceCollectionsRemoteglobalcachinghomeclusters;
    remoteTopics?: MsgVpnDistributedCacheClusterInstanceCollectionsRemotetopics;
}

export namespace MsgVpnDistributedCacheClusterInstanceCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceCollections';


}
/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstanceRemoteTopic } from './MsgVpnDistributedCacheClusterInstanceRemoteTopic';
import type { MsgVpnDistributedCacheClusterInstanceRemoteTopicCollections } from './MsgVpnDistributedCacheClusterInstanceRemoteTopicCollections';
import type { MsgVpnDistributedCacheClusterInstanceRemoteTopicLinks } from './MsgVpnDistributedCacheClusterInstanceRemoteTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstanceRemoteTopicResponse = {
    collections?: MsgVpnDistributedCacheClusterInstanceRemoteTopicCollections;
    data?: MsgVpnDistributedCacheClusterInstanceRemoteTopic;
    links?: MsgVpnDistributedCacheClusterInstanceRemoteTopicLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterInstanceRemoteTopicResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRemoteTopicResponse';


}
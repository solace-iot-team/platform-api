/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstanceRemoteTopic } from './MsgVpnDistributedCacheClusterInstanceRemoteTopic';
import type { MsgVpnDistributedCacheClusterInstanceRemoteTopicCollections } from './MsgVpnDistributedCacheClusterInstanceRemoteTopicCollections';
import type { MsgVpnDistributedCacheClusterInstanceRemoteTopicLinks } from './MsgVpnDistributedCacheClusterInstanceRemoteTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstanceRemoteTopicsResponse = {
    collections?: Array<MsgVpnDistributedCacheClusterInstanceRemoteTopicCollections>;
    data?: Array<MsgVpnDistributedCacheClusterInstanceRemoteTopic>;
    links?: Array<MsgVpnDistributedCacheClusterInstanceRemoteTopicLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterInstanceRemoteTopicsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRemoteTopicsResponse';


}
/* eslint-disable */


import type { MsgVpnDistributedCacheClusterTopic } from './MsgVpnDistributedCacheClusterTopic';
import type { MsgVpnDistributedCacheClusterTopicLinks } from './MsgVpnDistributedCacheClusterTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterTopicsResponse = {
    data?: Array<MsgVpnDistributedCacheClusterTopic>;
    links?: Array<MsgVpnDistributedCacheClusterTopicLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterTopicsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterTopicsResponse';


}
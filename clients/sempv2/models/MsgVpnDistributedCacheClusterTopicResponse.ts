/* eslint-disable */


import type { MsgVpnDistributedCacheClusterTopic } from './MsgVpnDistributedCacheClusterTopic';
import type { MsgVpnDistributedCacheClusterTopicLinks } from './MsgVpnDistributedCacheClusterTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterTopicResponse = {
    data?: MsgVpnDistributedCacheClusterTopic;
    links?: MsgVpnDistributedCacheClusterTopicLinks;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterTopicResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterTopicResponse';


}
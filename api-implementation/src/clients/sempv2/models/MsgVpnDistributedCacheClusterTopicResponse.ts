/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnDistributedCacheClusterTopic } from './MsgVpnDistributedCacheClusterTopic';
import type { MsgVpnDistributedCacheClusterTopicLinks } from './MsgVpnDistributedCacheClusterTopicLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnDistributedCacheClusterTopicResponse {
    data?: MsgVpnDistributedCacheClusterTopic;
    links?: MsgVpnDistributedCacheClusterTopicLinks;
    meta: SempMeta;
}

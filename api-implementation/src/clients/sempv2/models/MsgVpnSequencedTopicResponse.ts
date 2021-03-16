/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnSequencedTopic } from './MsgVpnSequencedTopic';
import type { MsgVpnSequencedTopicLinks } from './MsgVpnSequencedTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnSequencedTopicResponse = {
    data?: MsgVpnSequencedTopic;
    links?: MsgVpnSequencedTopicLinks;
    meta: SempMeta;
}

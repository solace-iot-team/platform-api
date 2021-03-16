/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnSequencedTopic } from './MsgVpnSequencedTopic';
import type { MsgVpnSequencedTopicLinks } from './MsgVpnSequencedTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnSequencedTopicsResponse = {
    data?: Array<MsgVpnSequencedTopic>;
    links?: Array<MsgVpnSequencedTopicLinks>;
    meta: SempMeta;
}

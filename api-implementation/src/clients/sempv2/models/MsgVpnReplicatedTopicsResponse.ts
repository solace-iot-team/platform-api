/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnReplicatedTopic } from './MsgVpnReplicatedTopic';
import type { MsgVpnReplicatedTopicLinks } from './MsgVpnReplicatedTopicLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnReplicatedTopicsResponse {
    data?: Array<MsgVpnReplicatedTopic>;
    links?: Array<MsgVpnReplicatedTopicLinks>;
    meta: SempMeta;
}

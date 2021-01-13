/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnJndiTopic } from './MsgVpnJndiTopic';
import type { MsgVpnJndiTopicLinks } from './MsgVpnJndiTopicLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnJndiTopicsResponse {
    data?: Array<MsgVpnJndiTopic>;
    links?: Array<MsgVpnJndiTopicLinks>;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnAclProfileSubscribeTopicException } from './MsgVpnAclProfileSubscribeTopicException';
import type { MsgVpnAclProfileSubscribeTopicExceptionLinks } from './MsgVpnAclProfileSubscribeTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeTopicExceptionsResponse = {
    data?: Array<MsgVpnAclProfileSubscribeTopicException>;
    links?: Array<MsgVpnAclProfileSubscribeTopicExceptionLinks>;
    meta: SempMeta;
}

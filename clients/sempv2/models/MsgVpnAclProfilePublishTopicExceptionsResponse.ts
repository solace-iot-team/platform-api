/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnAclProfilePublishTopicException } from './MsgVpnAclProfilePublishTopicException';
import type { MsgVpnAclProfilePublishTopicExceptionLinks } from './MsgVpnAclProfilePublishTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilePublishTopicExceptionsResponse = {
    data?: Array<MsgVpnAclProfilePublishTopicException>;
    links?: Array<MsgVpnAclProfilePublishTopicExceptionLinks>;
    meta: SempMeta;
}

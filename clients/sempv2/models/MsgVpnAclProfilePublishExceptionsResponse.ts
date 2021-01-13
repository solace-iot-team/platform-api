/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnAclProfilePublishException } from './MsgVpnAclProfilePublishException';
import type { MsgVpnAclProfilePublishExceptionLinks } from './MsgVpnAclProfilePublishExceptionLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnAclProfilePublishExceptionsResponse {
    data?: Array<MsgVpnAclProfilePublishException>;
    links?: Array<MsgVpnAclProfilePublishExceptionLinks>;
    meta: SempMeta;
}

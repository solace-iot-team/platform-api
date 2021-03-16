/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnAclProfileSubscribeException } from './MsgVpnAclProfileSubscribeException';
import type { MsgVpnAclProfileSubscribeExceptionLinks } from './MsgVpnAclProfileSubscribeExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeExceptionsResponse = {
    data?: Array<MsgVpnAclProfileSubscribeException>;
    links?: Array<MsgVpnAclProfileSubscribeExceptionLinks>;
    meta: SempMeta;
}

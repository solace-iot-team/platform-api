/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnAclProfileClientConnectException } from './MsgVpnAclProfileClientConnectException';
import type { MsgVpnAclProfileClientConnectExceptionLinks } from './MsgVpnAclProfileClientConnectExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileClientConnectExceptionsResponse = {
    data?: Array<MsgVpnAclProfileClientConnectException>;
    links?: Array<MsgVpnAclProfileClientConnectExceptionLinks>;
    meta: SempMeta;
}

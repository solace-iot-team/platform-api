/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnAclProfileSubscribeShareNameException } from './MsgVpnAclProfileSubscribeShareNameException';
import type { MsgVpnAclProfileSubscribeShareNameExceptionLinks } from './MsgVpnAclProfileSubscribeShareNameExceptionLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnAclProfileSubscribeShareNameExceptionsResponse {
    data?: Array<MsgVpnAclProfileSubscribeShareNameException>;
    links?: Array<MsgVpnAclProfileSubscribeShareNameExceptionLinks>;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnClientUsername } from './MsgVpnClientUsername';
import type { MsgVpnClientUsernameLinks } from './MsgVpnClientUsernameLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnClientUsernamesResponse {
    data?: Array<MsgVpnClientUsername>;
    links?: Array<MsgVpnClientUsernameLinks>;
    meta: SempMeta;
}

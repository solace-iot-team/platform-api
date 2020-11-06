/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnClientUsername } from './MsgVpnClientUsername';
import type { MsgVpnClientUsernameLinks } from './MsgVpnClientUsernameLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnClientUsernameResponse {
    data?: MsgVpnClientUsername;
    links?: MsgVpnClientUsernameLinks;
    meta: SempMeta;
}

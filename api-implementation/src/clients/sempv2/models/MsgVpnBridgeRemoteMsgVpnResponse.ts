/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnBridgeRemoteMsgVpn } from './MsgVpnBridgeRemoteMsgVpn';
import type { MsgVpnBridgeRemoteMsgVpnLinks } from './MsgVpnBridgeRemoteMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnBridgeRemoteMsgVpnResponse {
    data?: MsgVpnBridgeRemoteMsgVpn;
    links?: MsgVpnBridgeRemoteMsgVpnLinks;
    meta: SempMeta;
}

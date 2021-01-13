/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnBridgeRemoteMsgVpn } from './MsgVpnBridgeRemoteMsgVpn';
import type { MsgVpnBridgeRemoteMsgVpnLinks } from './MsgVpnBridgeRemoteMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnBridgeRemoteMsgVpnsResponse {
    data?: Array<MsgVpnBridgeRemoteMsgVpn>;
    links?: Array<MsgVpnBridgeRemoteMsgVpnLinks>;
    meta: SempMeta;
}

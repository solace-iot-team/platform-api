/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnDmrBridge } from './MsgVpnDmrBridge';
import type { MsgVpnDmrBridgeLinks } from './MsgVpnDmrBridgeLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnDmrBridgesResponse {
    data?: Array<MsgVpnDmrBridge>;
    links?: Array<MsgVpnDmrBridgeLinks>;
    meta: SempMeta;
}

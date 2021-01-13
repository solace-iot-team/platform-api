/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnBridge } from './MsgVpnBridge';
import type { MsgVpnBridgeLinks } from './MsgVpnBridgeLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnBridgesResponse {
    data?: Array<MsgVpnBridge>;
    links?: Array<MsgVpnBridgeLinks>;
    meta: SempMeta;
}

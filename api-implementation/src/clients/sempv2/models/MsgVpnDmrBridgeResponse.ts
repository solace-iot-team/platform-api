/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnDmrBridge } from './MsgVpnDmrBridge';
import type { MsgVpnDmrBridgeLinks } from './MsgVpnDmrBridgeLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnDmrBridgeResponse {
    data?: MsgVpnDmrBridge;
    links?: MsgVpnDmrBridgeLinks;
    meta: SempMeta;
}

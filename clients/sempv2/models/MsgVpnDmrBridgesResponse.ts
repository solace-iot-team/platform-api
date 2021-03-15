/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnDmrBridge } from './MsgVpnDmrBridge';
import type { MsgVpnDmrBridgeLinks } from './MsgVpnDmrBridgeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDmrBridgesResponse = {
    data?: Array<MsgVpnDmrBridge>;
    links?: Array<MsgVpnDmrBridgeLinks>;
    meta: SempMeta;
}

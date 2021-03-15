/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnBridge } from './MsgVpnBridge';
import type { MsgVpnBridgeLinks } from './MsgVpnBridgeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeResponse = {
    data?: MsgVpnBridge;
    links?: MsgVpnBridgeLinks;
    meta: SempMeta;
}

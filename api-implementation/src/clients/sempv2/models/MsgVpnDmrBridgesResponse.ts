/* eslint-disable */


import type { MsgVpnDmrBridge } from './MsgVpnDmrBridge';
import type { MsgVpnDmrBridgeLinks } from './MsgVpnDmrBridgeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDmrBridgesResponse = {
    data?: Array<MsgVpnDmrBridge>;
    links?: Array<MsgVpnDmrBridgeLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDmrBridgesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDmrBridgesResponse';


}
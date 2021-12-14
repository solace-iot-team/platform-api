/* eslint-disable */


import type { MsgVpnBridge } from './MsgVpnBridge';
import type { MsgVpnBridgeCollections } from './MsgVpnBridgeCollections';
import type { MsgVpnBridgeLinks } from './MsgVpnBridgeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgesResponse = {
    collections?: Array<MsgVpnBridgeCollections>;
    data?: Array<MsgVpnBridge>;
    links?: Array<MsgVpnBridgeLinks>;
    meta: SempMeta;
}

export namespace MsgVpnBridgesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgesResponse';


}
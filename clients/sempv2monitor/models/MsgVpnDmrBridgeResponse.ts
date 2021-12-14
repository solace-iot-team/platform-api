/* eslint-disable */


import type { MsgVpnDmrBridge } from './MsgVpnDmrBridge';
import type { MsgVpnDmrBridgeCollections } from './MsgVpnDmrBridgeCollections';
import type { MsgVpnDmrBridgeLinks } from './MsgVpnDmrBridgeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDmrBridgeResponse = {
    collections?: MsgVpnDmrBridgeCollections;
    data?: MsgVpnDmrBridge;
    links?: MsgVpnDmrBridgeLinks;
    meta: SempMeta;
}

export namespace MsgVpnDmrBridgeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDmrBridgeResponse';


}
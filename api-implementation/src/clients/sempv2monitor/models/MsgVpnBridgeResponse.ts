/* eslint-disable */


import type { MsgVpnBridge } from './MsgVpnBridge';
import type { MsgVpnBridgeCollections } from './MsgVpnBridgeCollections';
import type { MsgVpnBridgeLinks } from './MsgVpnBridgeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeResponse = {
    collections?: MsgVpnBridgeCollections;
    data?: MsgVpnBridge;
    links?: MsgVpnBridgeLinks;
    meta: SempMeta;
}

export namespace MsgVpnBridgeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeResponse';


}
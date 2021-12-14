/* eslint-disable */


import type { MsgVpnBridgeRemoteMsgVpn } from './MsgVpnBridgeRemoteMsgVpn';
import type { MsgVpnBridgeRemoteMsgVpnCollections } from './MsgVpnBridgeRemoteMsgVpnCollections';
import type { MsgVpnBridgeRemoteMsgVpnLinks } from './MsgVpnBridgeRemoteMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeRemoteMsgVpnsResponse = {
    collections?: Array<MsgVpnBridgeRemoteMsgVpnCollections>;
    data?: Array<MsgVpnBridgeRemoteMsgVpn>;
    links?: Array<MsgVpnBridgeRemoteMsgVpnLinks>;
    meta: SempMeta;
}

export namespace MsgVpnBridgeRemoteMsgVpnsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRemoteMsgVpnsResponse';


}
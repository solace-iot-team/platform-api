/* eslint-disable */


import type { MsgVpnBridgeRemoteMsgVpn } from './MsgVpnBridgeRemoteMsgVpn';
import type { MsgVpnBridgeRemoteMsgVpnLinks } from './MsgVpnBridgeRemoteMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeRemoteMsgVpnResponse = {
    data?: MsgVpnBridgeRemoteMsgVpn;
    links?: MsgVpnBridgeRemoteMsgVpnLinks;
    meta: SempMeta;
}

export namespace MsgVpnBridgeRemoteMsgVpnResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRemoteMsgVpnResponse';


}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnDmrBridge = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The remote Message VPN of the DMR Bridge. The default value is `""`.
     */
    remoteMsgVpnName?: string;
    /**
     * The name of the node at the remote end of the DMR Bridge.
     */
    remoteNodeName?: string;
}

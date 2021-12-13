/* eslint-disable */


export type MsgVpnDmrBridge = {
    /**
     * The last failure reason for the DMR Bridge.
     */
    failureReason?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The remote Message VPN of the DMR Bridge.
     */
    remoteMsgVpnName?: string;
    /**
     * The name of the node at the remote end of the DMR Bridge.
     */
    remoteNodeName?: string;
    /**
     * Indicates whether the operational state of the DMR Bridge is up.
     */
    up?: boolean;
    /**
     * The amount of time in seconds since the DMR Bridge was up.
     */
    uptime?: number;
}

export namespace MsgVpnDmrBridge {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDmrBridge';


}
/* eslint-disable */


/**
 * The counters for the Message VPN. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpn object.
 */
export type MsgVpnCounter = {
    /**
     * The amount of client control messages received from clients by the Message VPN, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    controlRxByteCount?: number;
    /**
     * The number of client control messages received from clients by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    controlRxMsgCount?: number;
    /**
     * The amount of client control messages transmitted to clients by the Message VPN, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    controlTxByteCount?: number;
    /**
     * The number of client control messages transmitted to clients by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    controlTxMsgCount?: number;
    /**
     * The amount of client data messages received from clients by the Message VPN, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    dataRxByteCount?: number;
    /**
     * The number of client data messages received from clients by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    dataRxMsgCount?: number;
    /**
     * The amount of client data messages transmitted to clients by the Message VPN, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    dataTxByteCount?: number;
    /**
     * The number of client data messages transmitted to clients by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    dataTxMsgCount?: number;
    /**
     * The number of messages discarded during reception by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    discardedRxMsgCount?: number;
    /**
     * The number of messages discarded during transmission by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    discardedTxMsgCount?: number;
    /**
     * The number of login request messages received by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    loginRxMsgCount?: number;
    /**
     * The number of login response messages transmitted by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    loginTxMsgCount?: number;
    /**
     * The number of guaranteed messages received by the Message VPN. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    msgSpoolRxMsgCount?: number;
    /**
     * The number of guaranteed messages transmitted by the Message VPN. One message to multiple clients is counted as one message. Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    msgSpoolTxMsgCount?: number;
    /**
     * The amount of TLS messages received by the Message VPN, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    tlsRxByteCount?: number;
    /**
     * The amount of TLS messages transmitted by the Message VPN, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    tlsTxByteCount?: number;
}

export namespace MsgVpnCounter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCounter';


}
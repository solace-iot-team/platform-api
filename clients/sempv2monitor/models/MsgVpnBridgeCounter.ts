/* eslint-disable */


/**
 * The counters for the Bridge. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpnBridge object.
 */
export type MsgVpnBridgeCounter = {
    /**
     * The amount of client control messages received from the Bridge, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    controlRxByteCount?: number;
    /**
     * The number of client control messages received from the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    controlRxMsgCount?: number;
    /**
     * The amount of client control messages transmitted to the Bridge, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    controlTxByteCount?: number;
    /**
     * The number of client control messages transmitted to the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    controlTxMsgCount?: number;
    /**
     * The amount of client data messages received from the Bridge, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    dataRxByteCount?: number;
    /**
     * The number of client data messages received from the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    dataRxMsgCount?: number;
    /**
     * The amount of client data messages transmitted to the Bridge, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    dataTxByteCount?: number;
    /**
     * The number of client data messages transmitted to the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    dataTxMsgCount?: number;
    /**
     * The number of messages discarded during reception from the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    discardedRxMsgCount?: number;
    /**
     * The number of messages discarded during transmission to the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    discardedTxMsgCount?: number;
    /**
     * The number of login request messages received from the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    loginRxMsgCount?: number;
    /**
     * The number of login response messages transmitted to the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    loginTxMsgCount?: number;
    /**
     * The number of guaranteed messages received from the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    msgSpoolRxMsgCount?: number;
    /**
     * The amount of messages received from the Bridge, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    rxByteCount?: number;
    /**
     * The number of messages received from the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    rxMsgCount?: number;
    /**
     * The amount of messages transmitted to the Bridge, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    txByteCount?: number;
    /**
     * The number of messages transmitted to the Bridge. Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    txMsgCount?: number;
}

export namespace MsgVpnBridgeCounter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeCounter';


}
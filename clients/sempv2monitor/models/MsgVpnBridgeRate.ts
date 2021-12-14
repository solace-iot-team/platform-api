/* eslint-disable */


/**
 * The rates for the Bridge. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpnBridge object.
 */
export type MsgVpnBridgeRate = {
    /**
     * The one minute average of the message rate received from the Bridge, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the message rate received from the Bridge, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the message rate transmitted to the Bridge, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the message rate transmitted to the Bridge, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    averageTxMsgRate?: number;
    /**
     * The current message rate received from the Bridge, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    rxByteRate?: number;
    /**
     * The current message rate received from the Bridge, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    rxMsgRate?: number;
    /**
     * The current message rate transmitted to the Bridge, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    txByteRate?: number;
    /**
     * The current message rate transmitted to the Bridge, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnBridge object.
     */
    txMsgRate?: number;
}

export namespace MsgVpnBridgeRate {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRate';


}
/* eslint-disable */


/**
 * The rates for the Message VPN. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpn object.
 */
export type MsgVpnRate = {
    /**
     * The one minute average of the message rate received by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the message rate received by the Message VPN, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Message VPN, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    averageTxMsgRate?: number;
    /**
     * The current message rate received by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    rxByteRate?: number;
    /**
     * The current message rate received by the Message VPN, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    rxMsgRate?: number;
    /**
     * The one minute average of the TLS message rate received by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    tlsAverageRxByteRate?: number;
    /**
     * The one minute average of the TLS message rate transmitted by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    tlsAverageTxByteRate?: number;
    /**
     * The current TLS message rate received by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    tlsRxByteRate?: number;
    /**
     * The current TLS message rate transmitted by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    tlsTxByteRate?: number;
    /**
     * The current message rate transmitted by the Message VPN, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    txByteRate?: number;
    /**
     * The current message rate transmitted by the Message VPN, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpn object.
     */
    txMsgRate?: number;
}

export namespace MsgVpnRate {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRate';


}
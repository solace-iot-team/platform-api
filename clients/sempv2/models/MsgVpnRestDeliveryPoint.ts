/* eslint-disable */


export type MsgVpnRestDeliveryPoint = {
    /**
     * The Client Profile of the REST Delivery Point. It must exist in the local Message VPN. Its TCP parameters are used for all REST Consumers in this RDP. Its queue properties are used by the RDP client. The Client Profile is used inside the auto-generated Client Username for this RDP. The default value is `"default"`.
     */
    clientProfileName?: string;
    /**
     * Enable or disable the REST Delivery Point. When disabled, no connections are initiated or messages delivered to any of the contained REST Consumers. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
    /**
     * The name of the service that this REST Delivery Point connects to. Internally the broker does not use this value; it is informational only. The default value is `""`. Available since 2.19.
     */
    service?: string;
    /**
     * The name of the vendor that this REST Delivery Point connects to. Internally the broker does not use this value; it is informational only. The default value is `""`. Available since 2.19.
     */
    vendor?: string;
}

export namespace MsgVpnRestDeliveryPoint {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPoint';


}
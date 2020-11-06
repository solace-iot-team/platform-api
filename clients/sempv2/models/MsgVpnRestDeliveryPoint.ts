/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnRestDeliveryPoint {
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
}

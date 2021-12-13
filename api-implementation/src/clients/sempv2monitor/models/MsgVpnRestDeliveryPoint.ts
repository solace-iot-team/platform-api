/* eslint-disable */


export type MsgVpnRestDeliveryPoint = {
    /**
     * The name of the Client for the REST Delivery Point.
     */
    clientName?: string;
    /**
     * The name of the Client Profile for the REST Delivery Point.
     */
    clientProfileName?: string;
    /**
     * Indicates whether the REST Delivery Point is enabled.
     */
    enabled?: boolean;
    /**
     * The reason for the last REST Delivery Point failure.
     */
    lastFailureReason?: string;
    /**
     * The timestamp of the last REST Delivery Point failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastFailureTime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
    /**
     * The name of the service that this REST Delivery Point connects to. Internally the broker does not use this value; it is informational only. Available since 2.19.
     */
    service?: string;
    /**
     * The percentage of time the REST Delivery Point connections are blocked from transmitting data.
     */
    timeConnectionsBlocked?: number;
    /**
     * Indicates whether the operational state of the REST Delivery Point is up.
     */
    up?: boolean;
    /**
     * The name of the vendor that this REST Delivery Point connects to. Internally the broker does not use this value; it is informational only. Available since 2.19.
     */
    vendor?: string;
}

export namespace MsgVpnRestDeliveryPoint {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPoint';


}
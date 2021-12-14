/* eslint-disable */


export type MsgVpnRestDeliveryPointQueueBinding = {
    /**
     * Indicates whether the authority for the request-target is replaced with that configured for the REST Consumer remote.
     */
    gatewayReplaceTargetAuthorityEnabled?: boolean;
    /**
     * The reason for the last REST Delivery Point queue binding failure.
     */
    lastFailureReason?: string;
    /**
     * The timestamp of the last REST Delivery Point queue binding failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastFailureTime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The request-target string being used when sending requests to a REST Consumer.
     */
    postRequestTarget?: string;
    /**
     * The name of a queue in the Message VPN.
     */
    queueBindingName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
    /**
     * Indicates whether the operational state of the REST Delivery Point queue binding is up.
     */
    up?: boolean;
    /**
     * The amount of time in seconds since the REST Delivery Point queue binding was up.
     */
    uptime?: number;
}

export namespace MsgVpnRestDeliveryPointQueueBinding {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBinding';


}
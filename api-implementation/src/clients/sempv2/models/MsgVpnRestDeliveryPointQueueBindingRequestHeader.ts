/* eslint-disable */


export type MsgVpnRestDeliveryPointQueueBindingRequestHeader = {
    /**
     * The name of the HTTP request header.
     */
    headerName?: string;
    /**
     * A substitution expression for the value of the HTTP request header. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    headerValue?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of a queue in the Message VPN.
     */
    queueBindingName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
}

export namespace MsgVpnRestDeliveryPointQueueBindingRequestHeader {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBindingRequestHeader';


}
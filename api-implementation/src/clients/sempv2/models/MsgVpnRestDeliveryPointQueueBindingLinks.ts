/* eslint-disable */


export type MsgVpnRestDeliveryPointQueueBindingLinks = {
    /**
     * The URI of this Queue Binding's collection of Request Header objects. Available since 2.23.
     */
    requestHeadersUri?: string;
    /**
     * The URI of this Queue Binding object.
     */
    uri?: string;
}

export namespace MsgVpnRestDeliveryPointQueueBindingLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBindingLinks';


}
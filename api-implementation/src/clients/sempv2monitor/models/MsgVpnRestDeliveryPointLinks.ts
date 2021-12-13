/* eslint-disable */


export type MsgVpnRestDeliveryPointLinks = {
    /**
     * The URI of this REST Delivery Point's collection of Queue Binding objects.
     */
    queueBindingsUri?: string;
    /**
     * The URI of this REST Delivery Point's collection of REST Consumer objects.
     */
    restConsumersUri?: string;
    /**
     * The URI of this REST Delivery Point object.
     */
    uri?: string;
}

export namespace MsgVpnRestDeliveryPointLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointLinks';


}
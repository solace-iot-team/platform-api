/* eslint-disable */


export type MsgVpnQueueLinks = {
    /**
     * The URI of this Queue's collection of Queue Subscription objects.
     */
    subscriptionsUri?: string;
    /**
     * The URI of this Queue object.
     */
    uri?: string;
}

export namespace MsgVpnQueueLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueLinks';


}
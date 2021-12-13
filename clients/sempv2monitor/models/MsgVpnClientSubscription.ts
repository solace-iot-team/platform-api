/* eslint-disable */


export type MsgVpnClientSubscription = {
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * The priority of the Subscription topic for receiving deliver-to-one (DTO) messages. The allowed values and their meaning are:
     *
     * <pre>
     * "p1" - The 1st or highest priority.
     * "p2" - The 2nd highest priority.
     * "p3" - The 3rd highest priority.
     * "p4" - The 4th highest priority.
     * "da" - Ignore priority and deliver always.
     * </pre>
     *
     */
    dtoPriority?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The topic of the Subscription.
     */
    subscriptionTopic?: string;
}

export namespace MsgVpnClientSubscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientSubscription';


}
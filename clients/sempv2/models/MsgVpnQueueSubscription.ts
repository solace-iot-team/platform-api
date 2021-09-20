/* eslint-disable */


export type MsgVpnQueueSubscription = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the Queue.
     */
    queueName?: string;
    /**
     * The topic of the Subscription.
     */
    subscriptionTopic?: string;
}

export namespace MsgVpnQueueSubscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueSubscription';


}
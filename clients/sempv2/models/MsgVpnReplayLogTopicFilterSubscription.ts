/* eslint-disable */


export type MsgVpnReplayLogTopicFilterSubscription = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the Replay Log.
     */
    replayLogName?: string;
    /**
     * The topic of the Subscription.
     */
    topicFilterSubscription?: string;
}

export namespace MsgVpnReplayLogTopicFilterSubscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogTopicFilterSubscription';


}
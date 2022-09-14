/* eslint-disable */


export type MsgVpnReplayLogLinks = {
    /**
     * The URI of this Replay Log's collection of Topic Filter Subscription objects. Available since 2.27.
     */
    topicFilterSubscriptionsUri?: string;
    /**
     * The URI of this Replay Log object.
     */
    uri?: string;
}

export namespace MsgVpnReplayLogLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogLinks';


}
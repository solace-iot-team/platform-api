/* eslint-disable */


export type MsgVpnTopicEndpointLinks = {
    /**
     * The URI of this Topic Endpoint's collection of Topic Endpoint Message objects.
     */
    msgsUri?: string;
    /**
     * The URI of this Topic Endpoint's collection of Topic Endpoint Priority objects.
     */
    prioritiesUri?: string;
    /**
     * The URI of this Topic Endpoint's collection of Topic Endpoint Transmit Flow objects.
     */
    txFlowsUri?: string;
    /**
     * The URI of this Topic Endpoint object.
     */
    uri?: string;
}

export namespace MsgVpnTopicEndpointLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointLinks';


}
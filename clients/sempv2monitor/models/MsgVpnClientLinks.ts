/* eslint-disable */


export type MsgVpnClientLinks = {
    /**
     * The URI of this Client's collection of Client Connection objects.
     */
    connectionsUri?: string;
    /**
     * The URI of this Client's collection of Client Receive Flow objects.
     */
    rxFlowsUri?: string;
    /**
     * The URI of this Client's collection of Client Subscription objects.
     */
    subscriptionsUri?: string;
    /**
     * The URI of this Client's collection of Client Transacted Session objects.
     */
    transactedSessionsUri?: string;
    /**
     * The URI of this Client's collection of Client Transmit Flow objects.
     */
    txFlowsUri?: string;
    /**
     * The URI of this Client object.
     */
    uri?: string;
}

export namespace MsgVpnClientLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientLinks';


}
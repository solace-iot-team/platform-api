/* eslint-disable */


export type MsgVpnTransactionLinks = {
    /**
     * The URI of this Replicated Local Transaction or XA Transaction's collection of Transaction Consumer Message objects.
     */
    consumerMsgsUri?: string;
    /**
     * The URI of this Replicated Local Transaction or XA Transaction's collection of Transaction Publisher Message objects.
     */
    publisherMsgsUri?: string;
    /**
     * The URI of this Replicated Local Transaction or XA Transaction object.
     */
    uri?: string;
}

export namespace MsgVpnTransactionLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionLinks';


}
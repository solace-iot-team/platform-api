/* eslint-disable */


export type MsgVpnRestDeliveryPointRestConsumerLinks = {
    /**
     * The URI of this REST Consumer's collection of Claim objects. Available since 2.21.
     */
    oauthJwtClaimsUri?: string;
    /**
     * The URI of this REST Consumer's collection of Trusted Common Name objects. Deprecated since (will be deprecated in next SEMP version). Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsTrustedCommonNamesUri?: string;
    /**
     * The URI of this REST Consumer object.
     */
    uri?: string;
}

export namespace MsgVpnRestDeliveryPointRestConsumerLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerLinks';


}
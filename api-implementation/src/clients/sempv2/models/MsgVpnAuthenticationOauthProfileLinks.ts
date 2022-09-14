/* eslint-disable */


export type MsgVpnAuthenticationOauthProfileLinks = {
    /**
     * The URI of this OAuth Profile's collection of Required Claim objects.
     */
    clientRequiredClaimsUri?: string;
    /**
     * The URI of this OAuth Profile's collection of Required Claim objects.
     */
    resourceServerRequiredClaimsUri?: string;
    /**
     * The URI of this OAuth Profile object.
     */
    uri?: string;
}

export namespace MsgVpnAuthenticationOauthProfileLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileLinks';


}
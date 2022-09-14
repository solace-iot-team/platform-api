/* eslint-disable */


export type MsgVpnAuthenticationOauthProfileClientRequiredClaim = {
    /**
     * The name of the ID token claim to verify.
     */
    clientRequiredClaimName?: string;
    /**
     * The required claim value.
     */
    clientRequiredClaimValue?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace MsgVpnAuthenticationOauthProfileClientRequiredClaim {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileClientRequiredClaim';


}
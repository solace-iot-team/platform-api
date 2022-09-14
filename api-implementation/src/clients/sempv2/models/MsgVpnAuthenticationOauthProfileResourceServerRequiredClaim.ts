/* eslint-disable */


export type MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
    /**
     * The name of the access token claim to verify.
     */
    resourceServerRequiredClaimName?: string;
    /**
     * The required claim value.
     */
    resourceServerRequiredClaimValue?: string;
}

export namespace MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim';


}
/* eslint-disable */


export type OauthProfileResourceServerRequiredClaim = {
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
    /**
     * The name of the access token claim to verify.
     */
    resourceServerRequiredClaimName?: string;
    /**
     * The required claim value, which must be a string containing a valid JSON value.
     */
    resourceServerRequiredClaimValue?: string;
}

export namespace OauthProfileResourceServerRequiredClaim {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileResourceServerRequiredClaim';


}
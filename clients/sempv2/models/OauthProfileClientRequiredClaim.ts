/* eslint-disable */


export type OauthProfileClientRequiredClaim = {
    /**
     * The name of the ID token claim to verify.
     */
    clientRequiredClaimName?: string;
    /**
     * The required claim value, which must be a string containing a valid JSON value.
     */
    clientRequiredClaimValue?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace OauthProfileClientRequiredClaim {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientRequiredClaim';


}
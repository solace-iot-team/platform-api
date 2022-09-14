/* eslint-disable */


export type OauthProfileClientAllowedHost = {
    /**
     * An allowed value for the Host header.
     */
    allowedHost?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace OauthProfileClientAllowedHost {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientAllowedHost';


}
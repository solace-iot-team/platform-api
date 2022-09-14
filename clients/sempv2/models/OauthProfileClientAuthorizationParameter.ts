/* eslint-disable */


export type OauthProfileClientAuthorizationParameter = {
    /**
     * The name of the authorization parameter.
     */
    authorizationParameterName?: string;
    /**
     * The authorization parameter value. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    authorizationParameterValue?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace OauthProfileClientAuthorizationParameter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientAuthorizationParameter';


}
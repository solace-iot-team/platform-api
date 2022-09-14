/* eslint-disable */


export type OauthProfileLinks = {
    /**
     * The URI of this OAuth Profile's collection of Group Access Level objects.
     */
    accessLevelGroupsUri?: string;
    /**
     * The URI of this OAuth Profile's collection of Allowed Host Value objects.
     */
    clientAllowedHostsUri?: string;
    /**
     * The URI of this OAuth Profile's collection of Authorization Parameter objects.
     */
    clientAuthorizationParametersUri?: string;
    /**
     * The URI of this OAuth Profile's collection of Required Claim objects.
     */
    clientRequiredClaimsUri?: string;
    /**
     * The URI of this OAuth Profile's collection of Message VPN Access-Level Exception objects.
     */
    defaultMsgVpnAccessLevelExceptionsUri?: string;
    /**
     * The URI of this OAuth Profile's collection of Required Claim objects.
     */
    resourceServerRequiredClaimsUri?: string;
    /**
     * The URI of this OAuth Profile object.
     */
    uri?: string;
}

export namespace OauthProfileLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileLinks';


}
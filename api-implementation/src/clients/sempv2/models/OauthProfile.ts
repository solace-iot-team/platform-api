/* eslint-disable */


export type OauthProfile = {
    /**
     * The name of the groups claim. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"groups"`.
     */
    accessLevelGroupsClaimName?: string;
    /**
     * The OAuth client id. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    clientId?: string;
    /**
     * The OAuth redirect URI. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    clientRedirectUri?: string;
    /**
     * The required value for the TYP field in the ID token header. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"JWT"`.
     */
    clientRequiredType?: string;
    /**
     * The OAuth scope. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"openid email"`.
     */
    clientScope?: string;
    /**
     * The OAuth client secret. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    clientSecret?: string;
    /**
     * Enable or disable verification of the TYP field in the ID token header. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    clientValidateTypeEnabled?: boolean;
    /**
     * The default global access level for this OAuth profile. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to global data.
     * "read-only" - User has read-only access to global data.
     * "read-write" - User has read-write access to most global data.
     * "admin" - User has read-write access to all global data.
     * </pre>
     *
     */
    defaultGlobalAccessLevel?: OauthProfile.defaultGlobalAccessLevel;
    /**
     * The default message VPN access level for the OAuth profile. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to a Message VPN.
     * "read-only" - User has read-only access to a Message VPN.
     * "read-write" - User has read-write access to most Message VPN settings.
     * </pre>
     *
     */
    defaultMsgVpnAccessLevel?: OauthProfile.defaultMsgVpnAccessLevel;
    /**
     * The user friendly name for the OAuth profile. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    displayName?: string;
    /**
     * Enable or disable the OAuth profile. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The OAuth authorization endpoint. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    endpointAuthorization?: string;
    /**
     * The OpenID Connect discovery endpoint or OAuth Authorization Server Metadata endpoint. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    endpointDiscovery?: string;
    /**
     * The number of seconds between discovery endpoint requests. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `86400`.
     */
    endpointDiscoveryRefreshInterval?: number;
    /**
     * The OAuth introspection endpoint. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    endpointIntrospection?: string;
    /**
     * The maximum time in seconds a token introspection request is allowed to take. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `1`.
     */
    endpointIntrospectionTimeout?: number;
    /**
     * The OAuth JWKS endpoint. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    endpointJwks?: string;
    /**
     * The number of seconds between JWKS endpoint requests. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `86400`.
     */
    endpointJwksRefreshInterval?: number;
    /**
     * The OAuth token endpoint. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    endpointToken?: string;
    /**
     * The maximum time in seconds a token request is allowed to take. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `1`.
     */
    endpointTokenTimeout?: number;
    /**
     * The OpenID Connect Userinfo endpoint. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    endpointUserinfo?: string;
    /**
     * The maximum time in seconds a userinfo request is allowed to take. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `1`.
     */
    endpointUserinfoTimeout?: number;
    /**
     * Enable or disable interactive logins via this OAuth provider. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    interactiveEnabled?: boolean;
    /**
     * The value of the prompt parameter provided to the OAuth authorization server for login requests where the session has expired. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    interactivePromptForExpiredSession?: string;
    /**
     * The value of the prompt parameter provided to the OAuth authorization server for login requests where the session is new or the user has explicitly logged out. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"select_account"`.
     */
    interactivePromptForNewSession?: string;
    /**
     * The Issuer Identifier for the OAuth provider. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    issuer?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
    /**
     * The OAuth role of the broker. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"client"`. The allowed values and their meaning are:
     *
     * <pre>
     * "client" - The broker is in the OAuth client role.
     * "resource-server" - The broker is in the OAuth resource server role.
     * </pre>
     *
     */
    oauthRole?: OauthProfile.oauthRole;
    /**
     * Enable or disable parsing of the access token as a JWT. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    resourceServerParseAccessTokenEnabled?: boolean;
    /**
     * The required audience value. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    resourceServerRequiredAudience?: string;
    /**
     * The required issuer value. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    resourceServerRequiredIssuer?: string;
    /**
     * A space-separated list of scopes that must be present in the scope claim. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    resourceServerRequiredScope?: string;
    /**
     * The required TYP value. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"at+jwt"`.
     */
    resourceServerRequiredType?: string;
    /**
     * Enable or disable verification of the audience claim in the access token or introspection response. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    resourceServerValidateAudienceEnabled?: boolean;
    /**
     * Enable or disable verification of the issuer claim in the access token or introspection response. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    resourceServerValidateIssuerEnabled?: boolean;
    /**
     * Enable or disable verification of the scope claim in the access token or introspection response. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    resourceServerValidateScopeEnabled?: boolean;
    /**
     * Enable or disable verification of the TYP field in the access token header. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    resourceServerValidateTypeEnabled?: boolean;
    /**
     * Enable or disable authentication of SEMP requests with OAuth tokens. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    sempEnabled?: boolean;
    /**
     * The name of the username claim. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"sub"`.
     */
    usernameClaimName?: string;
}

export namespace OauthProfile {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfile';

    /**
     * The default global access level for this OAuth profile. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to global data.
     * "read-only" - User has read-only access to global data.
     * "read-write" - User has read-write access to most global data.
     * "admin" - User has read-write access to all global data.
     * </pre>
     *
     */
    export enum defaultGlobalAccessLevel {
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
        ADMIN = 'admin',
    }

    /**
     * The default message VPN access level for the OAuth profile. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to a Message VPN.
     * "read-only" - User has read-only access to a Message VPN.
     * "read-write" - User has read-write access to most Message VPN settings.
     * </pre>
     *
     */
    export enum defaultMsgVpnAccessLevel {
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
    }

    /**
     * The OAuth role of the broker. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"client"`. The allowed values and their meaning are:
     *
     * <pre>
     * "client" - The broker is in the OAuth client role.
     * "resource-server" - The broker is in the OAuth resource server role.
     * </pre>
     *
     */
    export enum oauthRole {
        CLIENT = 'client',
        RESOURCE_SERVER = 'resource-server',
    }


}
/* eslint-disable */


export type MsgVpnAuthenticationOauthProvider = {
    /**
     * The audience claim name, indicating which part of the object to use for determining the audience. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"aud"`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    audienceClaimName?: string;
    /**
     * The audience claim source, indicating where to search for the audience value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     * Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    audienceClaimSource?: MsgVpnAuthenticationOauthProvider.audienceClaimSource;
    /**
     * The required audience value for a token to be considered valid. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    audienceClaimValue?: string;
    /**
     * Enable or disable audience validation. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    audienceValidationEnabled?: boolean;
    /**
     * The authorization group claim name, indicating which part of the object to use for determining the authorization group. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"scope"`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    authorizationGroupClaimName?: string;
    /**
     * The authorization group claim source, indicating where to search for the authorization group name. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     * Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    authorizationGroupClaimSource?: MsgVpnAuthenticationOauthProvider.authorizationGroupClaimSource;
    /**
     * Enable or disable OAuth based authorization. When enabled, the configured authorization type for OAuth clients is overridden. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    authorizationGroupEnabled?: boolean;
    /**
     * Enable or disable the disconnection of clients when their tokens expire. Changing this value does not affect existing clients, only new client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    disconnectOnTokenExpirationEnabled?: boolean;
    /**
     * Enable or disable OAuth Provider client authentication. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    enabled?: boolean;
    /**
     * The number of seconds between forced JWKS public key refreshing. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `86400`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    jwksRefreshInterval?: number;
    /**
     * The URI where the OAuth provider publishes its JWKS public keys. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    jwksUri?: string;
    /**
     * The name of the Message VPN. Deprecated since 2.25. Replaced by authenticationOauthProfiles.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth Provider. Deprecated since 2.25. Replaced by authenticationOauthProfiles.
     */
    oauthProviderName?: string;
    /**
     * Enable or disable whether to ignore time limits and accept tokens that are not yet valid or are no longer valid. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    tokenIgnoreTimeLimitsEnabled?: boolean;
    /**
     * The parameter name used to identify the token during access token introspection. A standards compliant OAuth introspection server expects "token". Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"token"`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    tokenIntrospectionParameterName?: string;
    /**
     * The password to use when logging into the token introspection URI. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    tokenIntrospectionPassword?: string;
    /**
     * The maximum time in seconds a token introspection is allowed to take. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    tokenIntrospectionTimeout?: number;
    /**
     * The token introspection URI of the OAuth authentication server. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    tokenIntrospectionUri?: string;
    /**
     * The username to use when logging into the token introspection URI. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    tokenIntrospectionUsername?: string;
    /**
     * The username claim name, indicating which part of the object to use for determining the username. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"sub"`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    usernameClaimName?: string;
    /**
     * The username claim source, indicating where to search for the username value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     * Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    usernameClaimSource?: MsgVpnAuthenticationOauthProvider.usernameClaimSource;
    /**
     * Enable or disable whether the API provided username will be validated against the username calculated from the token(s); the connection attempt is rejected if they differ. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    usernameValidateEnabled?: boolean;
}

export namespace MsgVpnAuthenticationOauthProvider {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProvider';

    /**
     * The audience claim source, indicating where to search for the audience value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     * Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    export enum audienceClaimSource {
        ACCESS_TOKEN = 'access-token',
        ID_TOKEN = 'id-token',
        INTROSPECTION = 'introspection',
    }

    /**
     * The authorization group claim source, indicating where to search for the authorization group name. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     * Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    export enum authorizationGroupClaimSource {
        ACCESS_TOKEN = 'access-token',
        ID_TOKEN = 'id-token',
        INTROSPECTION = 'introspection',
    }

    /**
     * The username claim source, indicating where to search for the username value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     * Deprecated since 2.25. authenticationOauthProviders replaced by authenticationOauthProfiles.
     */
    export enum usernameClaimSource {
        ACCESS_TOKEN = 'access-token',
        ID_TOKEN = 'id-token',
        INTROSPECTION = 'introspection',
    }


}
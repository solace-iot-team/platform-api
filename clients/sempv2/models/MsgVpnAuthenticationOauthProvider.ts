/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnAuthenticationOauthProvider {
    /**
     * The audience claim name, indicating which part of the object to use for determining the audience. The default value is `"aud"`.
     */
    audienceClaimName?: string;
    /**
     * The audience claim source, indicating where to search for the audience value. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     *
     */
    audienceClaimSource?: MsgVpnAuthenticationOauthProvider.audienceClaimSource;
    /**
     * The required audience value for a token to be considered valid. The default value is `""`.
     */
    audienceClaimValue?: string;
    /**
     * Enable or disable audience validation. The default value is `false`.
     */
    audienceValidationEnabled?: boolean;
    /**
     * The authorization group claim name, indicating which part of the object to use for determining the authorization group. The default value is `"scope"`.
     */
    authorizationGroupClaimName?: string;
    /**
     * The authorization group claim source, indicating where to search for the authorization group name. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     *
     */
    authorizationGroupClaimSource?: MsgVpnAuthenticationOauthProvider.authorizationGroupClaimSource;
    /**
     * Enable or disable OAuth based authorization. When enabled, the configured authorization type for OAuth clients is overridden. The default value is `false`.
     */
    authorizationGroupEnabled?: boolean;
    /**
     * Enable or disable the disconnection of clients when their tokens expire. Changing this value does not affect existing clients, only new client connections. The default value is `true`.
     */
    disconnectOnTokenExpirationEnabled?: boolean;
    /**
     * Enable or disable OAuth Provider client authentication. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The number of seconds between forced JWKS public key refreshing. The default value is `86400`.
     */
    jwksRefreshInterval?: number;
    /**
     * The URI where the OAuth provider publishes its JWKS public keys. The default value is `""`.
     */
    jwksUri?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth Provider.
     */
    oauthProviderName?: string;
    /**
     * Enable or disable whether to ignore time limits and accept tokens that are not yet valid or are no longer valid. The default value is `false`.
     */
    tokenIgnoreTimeLimitsEnabled?: boolean;
    /**
     * The parameter name used to identify the token during access token introspection. A standards compliant OAuth introspection server expects "token". The default value is `"token"`.
     */
    tokenIntrospectionParameterName?: string;
    /**
     * The password to use when logging into the token introspection URI. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default value is `""`.
     */
    tokenIntrospectionPassword?: string;
    /**
     * The maximum time in seconds a token introspection is allowed to take. The default value is `1`.
     */
    tokenIntrospectionTimeout?: number;
    /**
     * The token introspection URI of the OAuth authentication server. The default value is `""`.
     */
    tokenIntrospectionUri?: string;
    /**
     * The username to use when logging into the token introspection URI. The default value is `""`.
     */
    tokenIntrospectionUsername?: string;
    /**
     * The username claim name, indicating which part of the object to use for determining the username. The default value is `"sub"`.
     */
    usernameClaimName?: string;
    /**
     * The username claim source, indicating where to search for the username value. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     *
     */
    usernameClaimSource?: MsgVpnAuthenticationOauthProvider.usernameClaimSource;
    /**
     * Enable or disable whether the API provided username will be validated against the username calculated from the token(s); the connection attempt is rejected if they differ. The default value is `false`.
     */
    usernameValidateEnabled?: boolean;
}

export namespace MsgVpnAuthenticationOauthProvider {

    /**
     * The audience claim source, indicating where to search for the audience value. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     *
     */
    export enum audienceClaimSource {
        ACCESS_TOKEN = 'access-token',
        ID_TOKEN = 'id-token',
        INTROSPECTION = 'introspection',
    }

    /**
     * The authorization group claim source, indicating where to search for the authorization group name. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     *
     */
    export enum authorizationGroupClaimSource {
        ACCESS_TOKEN = 'access-token',
        ID_TOKEN = 'id-token',
        INTROSPECTION = 'introspection',
    }

    /**
     * The username claim source, indicating where to search for the username value. The default value is `"id-token"`. The allowed values and their meaning are:
     *
     * <pre>
     * "access-token" - The OAuth v2 access_token.
     * "id-token" - The OpenID Connect id_token.
     * "introspection" - The result of introspecting the OAuth v2 access_token.
     * </pre>
     *
     */
    export enum usernameClaimSource {
        ACCESS_TOKEN = 'access-token',
        ID_TOKEN = 'id-token',
        INTROSPECTION = 'introspection',
    }


}

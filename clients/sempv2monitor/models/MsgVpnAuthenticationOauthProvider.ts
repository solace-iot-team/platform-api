/* eslint-disable */


export type MsgVpnAuthenticationOauthProvider = {
    /**
     * The audience claim name, indicating which part of the object to use for determining the audience.
     */
    audienceClaimName?: string;
    /**
     * The audience claim source, indicating where to search for the audience value. The allowed values and their meaning are:
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
     * The required audience value for a token to be considered valid.
     */
    audienceClaimValue?: string;
    /**
     * Indicates whether audience validation is enabled.
     */
    audienceValidationEnabled?: boolean;
    /**
     * The number of OAuth Provider client authentications that succeeded.
     */
    authenticationSuccessCount?: number;
    /**
     * The authorization group claim name, indicating which part of the object to use for determining the authorization group.
     */
    authorizationGroupClaimName?: string;
    /**
     * The authorization group claim source, indicating where to search for the authorization group name. The allowed values and their meaning are:
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
     * Indicates whether OAuth based authorization is enabled and the configured authorization type for OAuth clients is overridden.
     */
    authorizationGroupEnabled?: boolean;
    /**
     * Indicates whether clients are disconnected when their tokens expire.
     */
    disconnectOnTokenExpirationEnabled?: boolean;
    /**
     * Indicates whether OAuth Provider client authentication is enabled.
     */
    enabled?: boolean;
    /**
     * The reason for the last JWKS public key refresh failure.
     */
    jwksLastRefreshFailureReason?: string;
    /**
     * The timestamp of the last JWKS public key refresh failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    jwksLastRefreshFailureTime?: number;
    /**
     * The timestamp of the last JWKS public key refresh success. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    jwksLastRefreshTime?: number;
    /**
     * The timestamp of the next scheduled JWKS public key refresh. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    jwksNextScheduledRefreshTime?: number;
    /**
     * The number of JWKS public key refresh failures.
     */
    jwksRefreshFailureCount?: number;
    /**
     * The number of seconds between forced JWKS public key refreshing.
     */
    jwksRefreshInterval?: number;
    /**
     * The URI where the OAuth provider publishes its JWKS public keys.
     */
    jwksUri?: string;
    /**
     * The number of login failures due to an incorrect audience value.
     */
    loginFailureIncorrectAudienceValueCount?: number;
    /**
     * The number of login failures due to an invalid audience value.
     */
    loginFailureInvalidAudienceValueCount?: number;
    /**
     * The number of login failures due to an invalid authorization group value (zero-length or non-string).
     */
    loginFailureInvalidAuthorizationGroupValueCount?: number;
    /**
     * The number of login failures due to an invalid JWT signature.
     */
    loginFailureInvalidJwtSignatureCount?: number;
    /**
     * The number of login failures due to an invalid username value.
     */
    loginFailureInvalidUsernameValueCount?: number;
    /**
     * The number of login failures due to a mismatched username.
     */
    loginFailureMismatchedUsernameCount?: number;
    /**
     * The number of login failures due to a missing audience claim.
     */
    loginFailureMissingAudienceCount?: number;
    /**
     * The number of login failures due to a missing JSON Web Key (JWK).
     */
    loginFailureMissingJwkCount?: number;
    /**
     * The number of login failures due to a missing or invalid token.
     */
    loginFailureMissingOrInvalidTokenCount?: number;
    /**
     * The number of login failures due to a missing username.
     */
    loginFailureMissingUsernameCount?: number;
    /**
     * The number of login failures due to a token being expired.
     */
    loginFailureTokenExpiredCount?: number;
    /**
     * The number of login failures due to a token introspection error response.
     */
    loginFailureTokenIntrospectionErroredCount?: number;
    /**
     * The number of login failures due to a failure to complete the token introspection.
     */
    loginFailureTokenIntrospectionFailureCount?: number;
    /**
     * The number of login failures due to a token introspection HTTPS error.
     */
    loginFailureTokenIntrospectionHttpsErrorCount?: number;
    /**
     * The number of login failures due to a token introspection response being invalid.
     */
    loginFailureTokenIntrospectionInvalidCount?: number;
    /**
     * The number of login failures due to a token introspection timeout.
     */
    loginFailureTokenIntrospectionTimeoutCount?: number;
    /**
     * The number of login failures due to a token not being valid yet.
     */
    loginFailureTokenNotValidYetCount?: number;
    /**
     * The number of login failures due to an unsupported algorithm.
     */
    loginFailureUnsupportedAlgCount?: number;
    /**
     * The number of clients that did not provide an authorization group claim value when expected.
     */
    missingAuthorizationGroupCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth Provider.
     */
    oauthProviderName?: string;
    /**
     * Indicates whether to ignore time limits and accept tokens that are not yet valid or are no longer valid.
     */
    tokenIgnoreTimeLimitsEnabled?: boolean;
    /**
     * The one minute average of the time required to complete a token introspection, in milliseconds (ms).
     */
    tokenIntrospectionAverageTime?: number;
    /**
     * The reason for the last token introspection failure.
     */
    tokenIntrospectionLastFailureReason?: string;
    /**
     * The timestamp of the last token introspection failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    tokenIntrospectionLastFailureTime?: number;
    /**
     * The parameter name used to identify the token during access token introspection. A standards compliant OAuth introspection server expects "token".
     */
    tokenIntrospectionParameterName?: string;
    /**
     * The number of token introspection successes.
     */
    tokenIntrospectionSuccessCount?: number;
    /**
     * The maximum time in seconds a token introspection is allowed to take.
     */
    tokenIntrospectionTimeout?: number;
    /**
     * The token introspection URI of the OAuth authentication server.
     */
    tokenIntrospectionUri?: string;
    /**
     * The username to use when logging into the token introspection URI.
     */
    tokenIntrospectionUsername?: string;
    /**
     * The username claim name, indicating which part of the object to use for determining the username.
     */
    usernameClaimName?: string;
    /**
     * The username claim source, indicating where to search for the username value. The allowed values and their meaning are:
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
     * Indicates whether the API provided username will be validated against the username calculated from the token(s).
     */
    usernameValidateEnabled?: boolean;
}

export namespace MsgVpnAuthenticationOauthProvider {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProvider';

    /**
     * The audience claim source, indicating where to search for the audience value. The allowed values and their meaning are:
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
     * The authorization group claim source, indicating where to search for the authorization group name. The allowed values and their meaning are:
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
     * The username claim source, indicating where to search for the username value. The allowed values and their meaning are:
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
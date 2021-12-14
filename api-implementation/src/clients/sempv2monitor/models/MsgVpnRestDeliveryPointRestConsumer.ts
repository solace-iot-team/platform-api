/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumerCounter } from './MsgVpnRestDeliveryPointRestConsumerCounter';

export type MsgVpnRestDeliveryPointRestConsumer = {
    /**
     * The username that the REST Consumer will use to login to the REST host.
     */
    authenticationHttpBasicUsername?: string;
    /**
     * The authentication header name. Available since 2.15.
     */
    authenticationHttpHeaderName?: string;
    /**
     * The OAuth client ID. Available since 2.19.
     */
    authenticationOauthClientId?: string;
    /**
     * The reason for the most recent OAuth token retrieval failure. Available since 2.19.
     */
    authenticationOauthClientLastFailureReason?: string;
    /**
     * The time of the last OAuth token retrieval failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.19.
     */
    authenticationOauthClientLastFailureTime?: number;
    /**
     * The OAuth scope. Available since 2.19.
     */
    authenticationOauthClientScope?: string;
    /**
     * The OAuth token endpoint URL that the REST Consumer will use to request a token for login to the REST host. Must begin with "https". Available since 2.19.
     */
    authenticationOauthClientTokenEndpoint?: string;
    /**
     * The validity duration of the OAuth token. Available since 2.19.
     */
    authenticationOauthClientTokenLifetime?: number;
    /**
     * The time at which the broker requested the token from the OAuth token endpoint. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.19.
     */
    authenticationOauthClientTokenRetrievedTime?: number;
    /**
     * The current state of the current OAuth token. The allowed values and their meaning are:
     *
     * <pre>
     * "valid" - The token is valid.
     * "invalid" - The token is invalid.
     * </pre>
     * Available since 2.19.
     */
    authenticationOauthClientTokenState?: string;
    /**
     * The reason for the most recent OAuth token retrieval failure. Available since 2.21.
     */
    authenticationOauthJwtLastFailureReason?: string;
    /**
     * The time of the last OAuth token retrieval failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.21.
     */
    authenticationOauthJwtLastFailureTime?: number;
    /**
     * The OAuth token endpoint URL that the REST Consumer will use to request a token for login to the REST host. Available since 2.21.
     */
    authenticationOauthJwtTokenEndpoint?: string;
    /**
     * The validity duration of the OAuth token. Available since 2.21.
     */
    authenticationOauthJwtTokenLifetime?: number;
    /**
     * The time at which the broker requested the token from the OAuth token endpoint. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.21.
     */
    authenticationOauthJwtTokenRetrievedTime?: number;
    /**
     * The current state of the current OAuth token. The allowed values and their meaning are:
     *
     * <pre>
     * "valid" - The token is valid.
     * "invalid" - The token is invalid.
     * </pre>
     * Available since 2.21.
     */
    authenticationOauthJwtTokenState?: string;
    /**
     * The authentication scheme used by the REST Consumer to login to the REST host. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Login with no authentication. This may be useful for anonymous connections or when a REST Consumer does not require authentication.
     * "http-basic" - Login with a username and optional password according to HTTP Basic authentication as per RFC2616.
     * "client-certificate" - Login with a client TLS certificate as per RFC5246. Client certificate authentication is only available on TLS connections.
     * "http-header" - Login with a specified HTTP header.
     * "oauth-client" - Login with OAuth 2.0 client credentials.
     * "oauth-jwt" - Login with OAuth (RFC 7523 JWT Profile).
     * "transparent" - Login using the Authorization header from the message properties, if present. Transparent authentication passes along existing Authorization header metadata instead of discarding it. Note that if the message is coming from a REST producer, the REST service must be configured to forward the Authorization header.
     * </pre>
     *
     */
    authenticationScheme?: MsgVpnRestDeliveryPointRestConsumer.authenticationScheme;
    counter?: MsgVpnRestDeliveryPointRestConsumerCounter;
    /**
     * Indicates whether the REST Consumer is enabled.
     */
    enabled?: boolean;
    /**
     * The HTTP method to use (POST or PUT). This is used only when operating in the REST service "messaging" mode and is ignored in "gateway" mode. The allowed values and their meaning are:
     *
     * <pre>
     * "post" - Use the POST HTTP method.
     * "put" - Use the PUT HTTP method.
     * </pre>
     * Available since 2.17.
     */
    httpMethod?: MsgVpnRestDeliveryPointRestConsumer.httpMethod;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer to close the connection. Available since 2.13.
     */
    httpRequestConnectionCloseTxMsgCount?: number;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer that are waiting for a response. Available since 2.13.
     */
    httpRequestOutstandingTxMsgCount?: number;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer that have timed out. Available since 2.13.
     */
    httpRequestTimedOutTxMsgCount?: number;
    /**
     * The amount of HTTP request messages transmitted to the REST Consumer, in bytes (B). Available since 2.13.
     */
    httpRequestTxByteCount?: number;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer. Available since 2.13.
     */
    httpRequestTxMsgCount?: number;
    /**
     * The number of HTTP client/server error response messages received from the REST Consumer. Available since 2.13.
     */
    httpResponseErrorRxMsgCount?: number;
    /**
     * The amount of HTTP response messages received from the REST Consumer, in bytes (B). Available since 2.13.
     */
    httpResponseRxByteCount?: number;
    /**
     * The number of HTTP response messages received from the REST Consumer. Available since 2.13.
     */
    httpResponseRxMsgCount?: number;
    /**
     * The number of HTTP successful response messages received from the REST Consumer. Available since 2.13.
     */
    httpResponseSuccessRxMsgCount?: number;
    /**
     * The local endpoint at the time of the last connection failure.
     */
    lastConnectionFailureLocalEndpoint?: string;
    /**
     * The reason for the last connection failure between local and remote endpoints.
     */
    lastConnectionFailureReason?: string;
    /**
     * The remote endpoint at the time of the last connection failure.
     */
    lastConnectionFailureRemoteEndpoint?: string;
    /**
     * The timestamp of the last connection failure between local and remote endpoints. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastConnectionFailureTime?: number;
    /**
     * The reason for the last REST Consumer failure.
     */
    lastFailureReason?: string;
    /**
     * The timestamp of the last REST Consumer failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastFailureTime?: number;
    /**
     * The interface that will be used for all outgoing connections associated with the REST Consumer. When unspecified, an interface is automatically chosen.
     */
    localInterface?: string;
    /**
     * The maximum amount of time (in seconds) to wait for an HTTP POST response from the REST Consumer. Once this time is exceeded, the TCP connection is reset.
     */
    maxPostWaitTime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The number of concurrent TCP connections open to the REST Consumer.
     */
    outgoingConnectionCount?: number;
    /**
     * The IP address or DNS name for the REST Consumer.
     */
    remoteHost?: string;
    /**
     * The number of outgoing connections for the REST Consumer that are up.
     */
    remoteOutgoingConnectionUpCount?: number;
    /**
     * The port associated with the host of the REST Consumer.
     */
    remotePort?: number;
    /**
     * The name of the REST Consumer.
     */
    restConsumerName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
    /**
     * The number of seconds that must pass before retrying the remote REST Consumer connection.
     */
    retryDelay?: number;
    /**
     * The colon-separated list of cipher suites the REST Consumer uses in its encrypted connection. The value `"default"` implies all supported suites ordered from most secure to least secure. The list of default cipher suites is available in the `tlsCipherSuiteMsgBackboneDefaultList` attribute of the Broker object in the Monitoring API. The REST Consumer should choose the first suite from this list that it supports.
     */
    tlsCipherSuiteList?: string;
    /**
     * Indicates whether encryption (TLS) is enabled for the REST Consumer.
     */
    tlsEnabled?: boolean;
    /**
     * Indicates whether the operational state of the REST Consumer is up.
     */
    up?: boolean;
}

export namespace MsgVpnRestDeliveryPointRestConsumer {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumer';

    /**
     * The authentication scheme used by the REST Consumer to login to the REST host. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Login with no authentication. This may be useful for anonymous connections or when a REST Consumer does not require authentication.
     * "http-basic" - Login with a username and optional password according to HTTP Basic authentication as per RFC2616.
     * "client-certificate" - Login with a client TLS certificate as per RFC5246. Client certificate authentication is only available on TLS connections.
     * "http-header" - Login with a specified HTTP header.
     * "oauth-client" - Login with OAuth 2.0 client credentials.
     * "oauth-jwt" - Login with OAuth (RFC 7523 JWT Profile).
     * "transparent" - Login using the Authorization header from the message properties, if present. Transparent authentication passes along existing Authorization header metadata instead of discarding it. Note that if the message is coming from a REST producer, the REST service must be configured to forward the Authorization header.
     * </pre>
     *
     */
    export enum authenticationScheme {
        NONE = 'none',
        HTTP_BASIC = 'http-basic',
        CLIENT_CERTIFICATE = 'client-certificate',
        HTTP_HEADER = 'http-header',
        OAUTH_CLIENT = 'oauth-client',
        OAUTH_JWT = 'oauth-jwt',
        TRANSPARENT = 'transparent',
    }

    /**
     * The HTTP method to use (POST or PUT). This is used only when operating in the REST service "messaging" mode and is ignored in "gateway" mode. The allowed values and their meaning are:
     *
     * <pre>
     * "post" - Use the POST HTTP method.
     * "put" - Use the PUT HTTP method.
     * </pre>
     * Available since 2.17.
     */
    export enum httpMethod {
        POST = 'post',
        PUT = 'put',
    }


}
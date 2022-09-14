/* eslint-disable */


export type MsgVpnRestDeliveryPointRestConsumer = {
    /**
     * The AWS access key id. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.26.
     */
    authenticationAwsAccessKeyId?: string;
    /**
     * The AWS region id. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.26.
     */
    authenticationAwsRegion?: string;
    /**
     * The AWS secret access key. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.26.
     */
    authenticationAwsSecretAccessKey?: string;
    /**
     * The AWS service id. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.26.
     */
    authenticationAwsService?: string;
    /**
     * The PEM formatted content for the client certificate that the REST Consumer will present to the REST host. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    authenticationClientCertContent?: string;
    /**
     * The password for the client certificate. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    authenticationClientCertPassword?: string;
    /**
     * The password for the username. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    authenticationHttpBasicPassword?: string;
    /**
     * The username that the REST Consumer will use to login to the REST host. Normally a username is only configured when basic authentication is selected for the REST Consumer. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    authenticationHttpBasicUsername?: string;
    /**
     * The authentication header name. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.15.
     */
    authenticationHttpHeaderName?: string;
    /**
     * The authentication header value. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.15.
     */
    authenticationHttpHeaderValue?: string;
    /**
     * The OAuth client ID. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.19.
     */
    authenticationOauthClientId?: string;
    /**
     * The OAuth scope. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.19.
     */
    authenticationOauthClientScope?: string;
    /**
     * The OAuth client secret. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.19.
     */
    authenticationOauthClientSecret?: string;
    /**
     * The OAuth token endpoint URL that the REST Consumer will use to request a token for login to the REST host. Must begin with "https". Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.19.
     */
    authenticationOauthClientTokenEndpoint?: string;
    /**
     * The OAuth secret key used to sign the token request JWT. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.21.
     */
    authenticationOauthJwtSecretKey?: string;
    /**
     * The OAuth token endpoint URL that the REST Consumer will use to request a token for login to the REST host. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.21.
     */
    authenticationOauthJwtTokenEndpoint?: string;
    /**
     * The authentication scheme used by the REST Consumer to login to the REST host. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Login with no authentication. This may be useful for anonymous connections or when a REST Consumer does not require authentication.
     * "http-basic" - Login with a username and optional password according to HTTP Basic authentication as per RFC2616.
     * "client-certificate" - Login with a client TLS certificate as per RFC5246. Client certificate authentication is only available on TLS connections.
     * "http-header" - Login with a specified HTTP header.
     * "oauth-client" - Login with OAuth 2.0 client credentials.
     * "oauth-jwt" - Login with OAuth (RFC 7523 JWT Profile).
     * "transparent" - Login using the Authorization header from the message properties, if present. Transparent authentication passes along existing Authorization header metadata instead of discarding it. Note that if the message is coming from a REST producer, the REST service must be configured to forward the Authorization header.
     * "aws" - Login using AWS Signature Version 4 authentication (AWS4-HMAC-SHA256).
     * </pre>
     *
     */
    authenticationScheme?: MsgVpnRestDeliveryPointRestConsumer.authenticationScheme;
    /**
     * Enable or disable the REST Consumer. When disabled, no connections are initiated or messages delivered to this particular REST Consumer. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The HTTP method to use (POST or PUT). This is used only when operating in the REST service "messaging" mode and is ignored in "gateway" mode. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"post"`. The allowed values and their meaning are:
     *
     * <pre>
     * "post" - Use the POST HTTP method.
     * "put" - Use the PUT HTTP method.
     * </pre>
     * Available since 2.17.
     */
    httpMethod?: MsgVpnRestDeliveryPointRestConsumer.httpMethod;
    /**
     * The interface that will be used for all outgoing connections associated with the REST Consumer. When unspecified, an interface is automatically chosen. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    localInterface?: string;
    /**
     * The maximum amount of time (in seconds) to wait for an HTTP POST response from the REST Consumer. Once this time is exceeded, the TCP connection is reset. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `30`.
     */
    maxPostWaitTime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The number of concurrent TCP connections open to the REST Consumer. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `3`.
     */
    outgoingConnectionCount?: number;
    /**
     * The IP address or DNS name to which the broker is to connect to deliver messages for the REST Consumer. A host value must be configured for the REST Consumer to be operationally up. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    remoteHost?: string;
    /**
     * The port associated with the host of the REST Consumer. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `8080`.
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
     * The number of seconds that must pass before retrying the remote REST Consumer connection. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `3`.
     */
    retryDelay?: number;
    /**
     * The colon-separated list of cipher suites the REST Consumer uses in its encrypted connection. The value `"default"` implies all supported suites ordered from most secure to least secure. The list of default cipher suites is available in the `tlsCipherSuiteMsgBackboneDefaultList` attribute of the Broker object in the Monitoring API. The REST Consumer should choose the first suite from this list that it supports. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"default"`.
     */
    tlsCipherSuiteList?: string;
    /**
     * Enable or disable encryption (TLS) for the REST Consumer. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    tlsEnabled?: boolean;
}

export namespace MsgVpnRestDeliveryPointRestConsumer {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumer';

    /**
     * The authentication scheme used by the REST Consumer to login to the REST host. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Login with no authentication. This may be useful for anonymous connections or when a REST Consumer does not require authentication.
     * "http-basic" - Login with a username and optional password according to HTTP Basic authentication as per RFC2616.
     * "client-certificate" - Login with a client TLS certificate as per RFC5246. Client certificate authentication is only available on TLS connections.
     * "http-header" - Login with a specified HTTP header.
     * "oauth-client" - Login with OAuth 2.0 client credentials.
     * "oauth-jwt" - Login with OAuth (RFC 7523 JWT Profile).
     * "transparent" - Login using the Authorization header from the message properties, if present. Transparent authentication passes along existing Authorization header metadata instead of discarding it. Note that if the message is coming from a REST producer, the REST service must be configured to forward the Authorization header.
     * "aws" - Login using AWS Signature Version 4 authentication (AWS4-HMAC-SHA256).
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
        AWS = 'aws',
    }

    /**
     * The HTTP method to use (POST or PUT). This is used only when operating in the REST service "messaging" mode and is ignored in "gateway" mode. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"post"`. The allowed values and their meaning are:
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
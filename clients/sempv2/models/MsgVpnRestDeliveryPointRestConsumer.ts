/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnRestDeliveryPointRestConsumer {
    /**
     * The PEM formatted content for the client certificate that the REST Consumer will present to the REST host. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    authenticationClientCertContent?: string;
    /**
     * The password for the client certificate. This attribute is absent from a GET and not updated when absent in a PUT. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    authenticationClientCertPassword?: string;
    /**
     * The password for the username. This attribute is absent from a GET and not updated when absent in a PUT. The default value is `""`.
     */
    authenticationHttpBasicPassword?: string;
    /**
     * The username that the REST Consumer will use to login to the REST host. Normally a username is only configured when basic authentication is selected for the REST Consumer. The default value is `""`.
     */
    authenticationHttpBasicUsername?: string;
    /**
     * The authentication scheme used by the REST Consumer to login to the REST host. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Login with no authentication. This may be useful for anonymous connections or when a REST Consumer does not require authentication.
     * "http-basic" - Login with a username and optional password according to HTTP Basic authentication as per RFC2616.
     * "client-certificate" - Login with a client TLS certificate as per RFC5246. Client certificate authentication is only available on TLS connections.
     * </pre>
     *
     */
    authenticationScheme?: MsgVpnRestDeliveryPointRestConsumer.authenticationScheme;
    /**
     * Enable or disable the REST Consumer. When disabled, no connections are initiated or messages delivered to this particular REST Consumer. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The interface that will be used for all outgoing connections associated with the REST Consumer. When unspecified, an interface is automatically chosen. The default value is `""`.
     */
    localInterface?: string;
    /**
     * The maximum amount of time (in seconds) to wait for an HTTP POST response from the REST Consumer. Once this time is exceeded, the TCP connection is reset. The default value is `30`.
     */
    maxPostWaitTime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The number of concurrent TCP connections open to the REST Consumer. The default value is `3`.
     */
    outgoingConnectionCount?: number;
    /**
     * The IP address or DNS name to which the broker is to connect to deliver messages for the REST Consumer. A host value must be configured for the REST Consumer to be operationally up. The default value is `""`.
     */
    remoteHost?: string;
    /**
     * The port associated with the host of the REST Consumer. The default value is `8080`.
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
     * The number of seconds that must pass before retrying the remote REST Consumer connection. The default value is `3`.
     */
    retryDelay?: number;
    /**
     * The colon-separated list of cipher suites the REST Consumer uses in its encrypted connection. The value `"default"` implies all supported suites ordered from most secure to least secure. The list of default cipher suites is available in the `tlsCipherSuiteMsgBackboneDefaultList` attribute of the Broker object in the Monitoring API. The REST Consumer should choose the first suite from this list that it supports. The default value is `"default"`.
     */
    tlsCipherSuiteList?: string;
    /**
     * Enable or disable encryption (TLS) for the REST Consumer. The default value is `false`.
     */
    tlsEnabled?: boolean;
}

export namespace MsgVpnRestDeliveryPointRestConsumer {

    /**
     * The authentication scheme used by the REST Consumer to login to the REST host. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Login with no authentication. This may be useful for anonymous connections or when a REST Consumer does not require authentication.
     * "http-basic" - Login with a username and optional password according to HTTP Basic authentication as per RFC2616.
     * "client-certificate" - Login with a client TLS certificate as per RFC5246. Client certificate authentication is only available on TLS connections.
     * </pre>
     *
     */
    export enum authenticationScheme {
        NONE = 'none',
        HTTP_BASIC = 'http-basic',
        CLIENT_CERTIFICATE = 'client-certificate',
    }


}

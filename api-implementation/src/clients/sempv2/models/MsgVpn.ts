/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventThreshold } from './EventThreshold';
import type { EventThresholdByValue } from './EventThresholdByValue';

export type MsgVpn = {
    /**
     * The name of another Message VPN which this Message VPN is an alias for. When this Message VPN is enabled, the alias has no effect. When this Message VPN is disabled, Clients (but not Bridges and routing Links) logging into this Message VPN are automatically logged in to the other Message VPN, and authentication and authorization take place in the context of the other Message VPN.
     *
     * Aliases may form a non-circular chain, cascading one to the next. The default value is `""`. Available since 2.14.
     */
    alias?: string;
    /**
     * Enable or disable basic authentication for clients connecting to the Message VPN. Basic authentication is authentication that involves the use of a username and password to prove identity. If a user provides credentials for a different authentication scheme, this setting is not applicable. The default value is `true`.
     */
    authenticationBasicEnabled?: boolean;
    /**
     * The name of the RADIUS or LDAP Profile to use for basic authentication. The default value is `"default"`.
     */
    authenticationBasicProfileName?: string;
    /**
     * The RADIUS domain to use for basic authentication. The default value is `""`.
     */
    authenticationBasicRadiusDomain?: string;
    /**
     * The type of basic authentication to use for clients connecting to the Message VPN. The default value is `"radius"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Internal database. Authentication is against Client Usernames.
     * "ldap" - LDAP authentication. An LDAP profile name must be provided.
     * "radius" - RADIUS authentication. A RADIUS profile name must be provided.
     * "none" - No authentication. Anonymous login allowed.
     * </pre>
     *
     */
    authenticationBasicType?: MsgVpn.authenticationBasicType;
    /**
     * Enable or disable allowing a client to specify a Client Username via the API connect method. When disabled, the certificate CN (Common Name) is always used. The default value is `false`.
     */
    authenticationClientCertAllowApiProvidedUsernameEnabled?: boolean;
    /**
     * Enable or disable client certificate authentication in the Message VPN. The default value is `false`.
     */
    authenticationClientCertEnabled?: boolean;
    /**
     * The maximum depth for a client certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. The default value is `3`.
     */
    authenticationClientCertMaxChainDepth?: number;
    /**
     * The desired behavior for client certificate revocation checking. The default value is `"allow-valid"`. The allowed values and their meaning are:
     *
     * <pre>
     * "allow-all" - Allow the client to authenticate, the result of client certificate revocation check is ignored.
     * "allow-unknown" - Allow the client to authenticate even if the revocation status of his certificate cannot be determined.
     * "allow-valid" - Allow the client to authenticate only when the revocation check returned an explicit positive response.
     * </pre>
     * Available since 2.6.
     */
    authenticationClientCertRevocationCheckMode?: MsgVpn.authenticationClientCertRevocationCheckMode;
    /**
     * The field from the client certificate to use as the client username. The default value is `"common-name"`. The allowed values and their meaning are:
     *
     * <pre>
     * "common-name" - The username is extracted from the certificate's Common Name.
     * "subject-alternate-name-msupn" - The username is extracted from the certificate's Other Name type of the Subject Alternative Name and must have the msUPN signature.
     * </pre>
     * Available since 2.6.
     */
    authenticationClientCertUsernameSource?: MsgVpn.authenticationClientCertUsernameSource;
    /**
     * Enable or disable validation of the "Not Before" and "Not After" validity dates in the client certificate. The default value is `true`.
     */
    authenticationClientCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable allowing a client to specify a Client Username via the API connect method. When disabled, the Kerberos Principal name is always used. The default value is `false`.
     */
    authenticationKerberosAllowApiProvidedUsernameEnabled?: boolean;
    /**
     * Enable or disable Kerberos authentication in the Message VPN. The default value is `false`.
     */
    authenticationKerberosEnabled?: boolean;
    /**
     * The name of the provider to use when the client does not supply a provider name. The default value is `""`. Available since 2.13.
     */
    authenticationOauthDefaultProviderName?: string;
    /**
     * Enable or disable OAuth authentication. The default value is `false`. Available since 2.13.
     */
    authenticationOauthEnabled?: boolean;
    /**
     * The name of the attribute that is retrieved from the LDAP server as part of the LDAP search when authorizing a client connecting to the Message VPN. The default value is `"memberOf"`.
     */
    authorizationLdapGroupMembershipAttributeName?: string;
    /**
     * Enable or disable client-username domain trimming for LDAP lookups of client connections. When enabled, the value of $CLIENT_USERNAME (when used for searching) will be truncated at the first occurance of the @ character. For example, if the client-username is in the form of an email address, then the domain portion will be removed. The default value is `false`. Available since 2.13.
     */
    authorizationLdapTrimClientUsernameDomainEnabled?: boolean;
    /**
     * The name of the LDAP Profile to use for client authorization. The default value is `""`.
     */
    authorizationProfileName?: string;
    /**
     * The type of authorization to use for clients connecting to the Message VPN. The default value is `"internal"`. The allowed values and their meaning are:
     *
     * <pre>
     * "ldap" - LDAP authorization.
     * "internal" - Internal authorization.
     * </pre>
     *
     */
    authorizationType?: MsgVpn.authorizationType;
    /**
     * Enable or disable validation of the Common Name (CN) in the server certificate from the remote broker. If enabled, the Common Name is checked against the list of Trusted Common Names configured for the Bridge. Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is enabled. The default value is `true`. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    bridgingTlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum depth for a server certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. The default value is `3`.
     */
    bridgingTlsServerCertMaxChainDepth?: number;
    /**
     * Enable or disable validation of the "Not Before" and "Not After" validity dates in the server certificate. When disabled, a certificate will be accepted even if the certificate is not valid based on these dates. The default value is `true`.
     */
    bridgingTlsServerCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable the standard TLS authentication mechanism of verifying the name used to connect to the bridge. If enabled, the name used to connect to the bridge is checked against the names specified in the certificate returned by the remote router. Legacy Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is also enabled. The default value is `true`. Available since 2.18.
     */
    bridgingTlsServerCertValidateNameEnabled?: boolean;
    /**
     * Enable or disable managing of cache instances over the message bus. The default value is `true`.
     */
    distributedCacheManagementEnabled?: boolean;
    /**
     * Enable or disable Dynamic Message Routing (DMR) for the Message VPN. The default value is `false`. Available since 2.11.
     */
    dmrEnabled?: boolean;
    /**
     * Enable or disable the Message VPN. The default value is `false`.
     */
    enabled?: boolean;
    eventConnectionCountThreshold?: EventThreshold;
    eventEgressFlowCountThreshold?: EventThreshold;
    eventEgressMsgRateThreshold?: EventThresholdByValue;
    eventEndpointCountThreshold?: EventThreshold;
    eventIngressFlowCountThreshold?: EventThreshold;
    eventIngressMsgRateThreshold?: EventThresholdByValue;
    /**
     * The threshold, in kilobytes, after which a message is considered to be large for the Message VPN. The default value is `1024`.
     */
    eventLargeMsgThreshold?: number;
    /**
     * A prefix applied to all published Events in the Message VPN. The default value is `""`.
     */
    eventLogTag?: string;
    eventMsgSpoolUsageThreshold?: EventThreshold;
    /**
     * Enable or disable Client level Event message publishing. The default value is `false`.
     */
    eventPublishClientEnabled?: boolean;
    /**
     * Enable or disable Message VPN level Event message publishing. The default value is `false`.
     */
    eventPublishMsgVpnEnabled?: boolean;
    /**
     * Subscription level Event message publishing mode. The default value is `"off"`. The allowed values and their meaning are:
     *
     * <pre>
     * "off" - Disable client level event message publishing.
     * "on-with-format-v1" - Enable client level event message publishing with format v1.
     * "on-with-no-unsubscribe-events-on-disconnect-format-v1" - As "on-with-format-v1", but unsubscribe events are not generated when a client disconnects. Unsubscribe events are still raised when a client explicitly unsubscribes from its subscriptions.
     * "on-with-format-v2" - Enable client level event message publishing with format v2.
     * "on-with-no-unsubscribe-events-on-disconnect-format-v2" - As "on-with-format-v2", but unsubscribe events are not generated when a client disconnects. Unsubscribe events are still raised when a client explicitly unsubscribes from its subscriptions.
     * </pre>
     *
     */
    eventPublishSubscriptionMode?: MsgVpn.eventPublishSubscriptionMode;
    /**
     * Enable or disable Event publish topics in MQTT format. The default value is `false`.
     */
    eventPublishTopicFormatMqttEnabled?: boolean;
    /**
     * Enable or disable Event publish topics in SMF format. The default value is `true`.
     */
    eventPublishTopicFormatSmfEnabled?: boolean;
    eventServiceAmqpConnectionCountThreshold?: EventThreshold;
    eventServiceMqttConnectionCountThreshold?: EventThreshold;
    eventServiceRestIncomingConnectionCountThreshold?: EventThreshold;
    eventServiceSmfConnectionCountThreshold?: EventThreshold;
    eventServiceWebConnectionCountThreshold?: EventThreshold;
    eventSubscriptionCountThreshold?: EventThreshold;
    eventTransactedSessionCountThreshold?: EventThreshold;
    eventTransactionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the export of subscriptions in the Message VPN to other routers in the network over Neighbor links. The default value is `false`.
     */
    exportSubscriptionsEnabled?: boolean;
    /**
     * Enable or disable JNDI access for clients in the Message VPN. The default value is `false`. Available since 2.2.
     */
    jndiEnabled?: boolean;
    /**
     * The maximum number of client connections to the Message VPN. The default is the maximum value supported by the platform.
     */
    maxConnectionCount?: number;
    /**
     * The maximum number of transmit flows that can be created in the Message VPN. The default value is `1000`.
     */
    maxEgressFlowCount?: number;
    /**
     * The maximum number of Queues and Topic Endpoints that can be created in the Message VPN. The default value is `1000`.
     */
    maxEndpointCount?: number;
    /**
     * The maximum number of receive flows that can be created in the Message VPN. The default value is `1000`.
     */
    maxIngressFlowCount?: number;
    /**
     * The maximum message spool usage by the Message VPN, in megabytes. The default value is `0`.
     */
    maxMsgSpoolUsage?: number;
    /**
     * The maximum number of local client subscriptions that can be added to the Message VPN. This limit is not enforced when a subscription is added using a management interface, such as CLI or SEMP. The default varies by platform.
     */
    maxSubscriptionCount?: number;
    /**
     * The maximum number of transacted sessions that can be created in the Message VPN. The default varies by platform.
     */
    maxTransactedSessionCount?: number;
    /**
     * The maximum number of transactions that can be created in the Message VPN. The default varies by platform.
     */
    maxTransactionCount?: number;
    /**
     * The maximum total memory usage of the MQTT Retain feature for this Message VPN, in MB. If the maximum memory is reached, any arriving retain messages that require more memory are discarded. A value of -1 indicates that the memory is bounded only by the global max memory limit. A value of 0 prevents MQTT Retain from becoming operational. The default value is `-1`. Available since 2.11.
     */
    mqttRetainMaxMemory?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The acknowledgement (ACK) propagation interval for the replication Bridge, in number of replicated messages. The default value is `20`.
     */
    replicationAckPropagationIntervalMsgCount?: number;
    /**
     * The Client Username the replication Bridge uses to login to the remote Message VPN. The default value is `""`.
     */
    replicationBridgeAuthenticationBasicClientUsername?: string;
    /**
     * The password for the Client Username. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default value is `""`.
     */
    replicationBridgeAuthenticationBasicPassword?: string;
    /**
     * The PEM formatted content for the client certificate used by this bridge to login to the Remote Message VPN. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    replicationBridgeAuthenticationClientCertContent?: string;
    /**
     * The password for the client certificate. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    replicationBridgeAuthenticationClientCertPassword?: string;
    /**
     * The authentication scheme for the replication Bridge in the Message VPN. The default value is `"basic"`. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    replicationBridgeAuthenticationScheme?: MsgVpn.replicationBridgeAuthenticationScheme;
    /**
     * Enable or disable use of compression for the replication Bridge. The default value is `false`.
     */
    replicationBridgeCompressedDataEnabled?: boolean;
    /**
     * The size of the window used for guaranteed messages published to the replication Bridge, in messages. The default value is `255`.
     */
    replicationBridgeEgressFlowWindowSize?: number;
    /**
     * The number of seconds that must pass before retrying the replication Bridge connection. The default value is `3`.
     */
    replicationBridgeRetryDelay?: number;
    /**
     * Enable or disable use of encryption (TLS) for the replication Bridge connection. The default value is `false`.
     */
    replicationBridgeTlsEnabled?: boolean;
    /**
     * The Client Profile for the unidirectional replication Bridge in the Message VPN. It is used only for the TCP parameters. The default value is `"#client-profile"`.
     */
    replicationBridgeUnidirectionalClientProfileName?: string;
    /**
     * Enable or disable replication for the Message VPN. The default value is `false`.
     */
    replicationEnabled?: boolean;
    /**
     * The behavior to take when enabling replication for the Message VPN, depending on the existence of the replication Queue. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default value is `"fail-on-existing-queue"`. The allowed values and their meaning are:
     *
     * <pre>
     * "fail-on-existing-queue" - The data replication queue must not already exist.
     * "force-use-existing-queue" - The data replication queue must already exist. Any data messages on the Queue will be forwarded to interested applications. IMPORTANT: Before using this mode be certain that the messages are not stale or otherwise unsuitable to be forwarded. This mode can only be specified when the existing queue is configured the same as is currently specified under replication configuration otherwise the enabling of replication will fail.
     * "force-recreate-queue" - The data replication queue must already exist. Any data messages on the Queue will be discarded. IMPORTANT: Before using this mode be certain that the messages on the existing data replication queue are not needed by interested applications.
     * </pre>
     *
     */
    replicationEnabledQueueBehavior?: MsgVpn.replicationEnabledQueueBehavior;
    /**
     * The maximum message spool usage by the replication Bridge local Queue (quota), in megabytes. The default value is `60000`.
     */
    replicationQueueMaxMsgSpoolUsage?: number;
    /**
     * Enable or disable whether messages discarded on the replication Bridge local Queue are rejected back to the sender. The default value is `true`.
     */
    replicationQueueRejectMsgToSenderOnDiscardEnabled?: boolean;
    /**
     * Enable or disable whether guaranteed messages published to synchronously replicated Topics are rejected back to the sender when synchronous replication becomes ineligible. The default value is `false`.
     */
    replicationRejectMsgWhenSyncIneligibleEnabled?: boolean;
    /**
     * The replication role for the Message VPN. The default value is `"standby"`. The allowed values and their meaning are:
     *
     * <pre>
     * "active" - Assume the Active role in replication for the Message VPN.
     * "standby" - Assume the Standby role in replication for the Message VPN.
     * </pre>
     *
     */
    replicationRole?: MsgVpn.replicationRole;
    /**
     * The transaction replication mode for all transactions within the Message VPN. Changing this value during operation will not affect existing transactions; it is only used upon starting a transaction. The default value is `"async"`. The allowed values and their meaning are:
     *
     * <pre>
     * "sync" - Messages are acknowledged when replicated (spooled remotely).
     * "async" - Messages are acknowledged when pending replication (spooled locally).
     * </pre>
     *
     */
    replicationTransactionMode?: MsgVpn.replicationTransactionMode;
    /**
     * Enable or disable validation of the Common Name (CN) in the server certificate from the remote REST Consumer. If enabled, the Common Name is checked against the list of Trusted Common Names configured for the REST Consumer. Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is enabled. The default value is `true`. Deprecated since 2.17. Common Name validation has been replaced by Server Certificate Name validation.
     */
    restTlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum depth for a REST Consumer server certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. The default value is `3`.
     */
    restTlsServerCertMaxChainDepth?: number;
    /**
     * Enable or disable validation of the "Not Before" and "Not After" validity dates in the REST Consumer server certificate. The default value is `true`.
     */
    restTlsServerCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable the standard TLS authentication mechanism of verifying the name used to connect to the remote REST Consumer. If enabled, the name used to connect to the remote REST Consumer is checked against the names specified in the certificate returned by the remote router. Legacy Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is also enabled. The default value is `true`. Available since 2.17.
     */
    restTlsServerCertValidateNameEnabled?: boolean;
    /**
     * Enable or disable "admin client" SEMP over the message bus commands for the current Message VPN. The default value is `false`.
     */
    sempOverMsgBusAdminClientEnabled?: boolean;
    /**
     * Enable or disable "admin distributed-cache" SEMP over the message bus commands for the current Message VPN. The default value is `false`.
     */
    sempOverMsgBusAdminDistributedCacheEnabled?: boolean;
    /**
     * Enable or disable "admin" SEMP over the message bus commands for the current Message VPN. The default value is `false`.
     */
    sempOverMsgBusAdminEnabled?: boolean;
    /**
     * Enable or disable SEMP over the message bus for the current Message VPN. The default value is `true`.
     */
    sempOverMsgBusEnabled?: boolean;
    /**
     * Enable or disable "show" SEMP over the message bus commands for the current Message VPN. The default value is `false`.
     */
    sempOverMsgBusShowEnabled?: boolean;
    /**
     * The maximum number of AMQP client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform. The default is the maximum value supported by the platform. Available since 2.7.
     */
    serviceAmqpMaxConnectionCount?: number;
    /**
     * Enable or disable the plain-text AMQP service in the Message VPN. Disabling causes clients connected to the corresponding listen-port to be disconnected. The default value is `false`. Available since 2.7.
     */
    serviceAmqpPlainTextEnabled?: boolean;
    /**
     * The port number for plain-text AMQP clients that connect to the Message VPN. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`. Available since 2.7.
     */
    serviceAmqpPlainTextListenPort?: number;
    /**
     * Enable or disable the use of encryption (TLS) for the AMQP service in the Message VPN. Disabling causes clients currently connected over TLS to be disconnected. The default value is `false`. Available since 2.7.
     */
    serviceAmqpTlsEnabled?: boolean;
    /**
     * The port number for AMQP clients that connect to the Message VPN over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`. Available since 2.7.
     */
    serviceAmqpTlsListenPort?: number;
    /**
     * The maximum number of MQTT client connections that can be simultaneously connected to the Message VPN. The default is the maximum value supported by the platform. Available since 2.1.
     */
    serviceMqttMaxConnectionCount?: number;
    /**
     * Enable or disable the plain-text MQTT service in the Message VPN. Disabling causes clients currently connected to be disconnected. The default value is `false`. Available since 2.1.
     */
    serviceMqttPlainTextEnabled?: boolean;
    /**
     * The port number for plain-text MQTT clients that connect to the Message VPN. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`. Available since 2.1.
     */
    serviceMqttPlainTextListenPort?: number;
    /**
     * Enable or disable the use of encryption (TLS) for the MQTT service in the Message VPN. Disabling causes clients currently connected over TLS to be disconnected. The default value is `false`. Available since 2.1.
     */
    serviceMqttTlsEnabled?: boolean;
    /**
     * The port number for MQTT clients that connect to the Message VPN over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`. Available since 2.1.
     */
    serviceMqttTlsListenPort?: number;
    /**
     * Enable or disable the use of encrypted WebSocket (WebSocket over TLS) for the MQTT service in the Message VPN. Disabling causes clients currently connected by encrypted WebSocket to be disconnected. The default value is `false`. Available since 2.1.
     */
    serviceMqttTlsWebSocketEnabled?: boolean;
    /**
     * The port number for MQTT clients that connect to the Message VPN using WebSocket over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`. Available since 2.1.
     */
    serviceMqttTlsWebSocketListenPort?: number;
    /**
     * Enable or disable the use of WebSocket for the MQTT service in the Message VPN. Disabling causes clients currently connected by WebSocket to be disconnected. The default value is `false`. Available since 2.1.
     */
    serviceMqttWebSocketEnabled?: boolean;
    /**
     * The port number for plain-text MQTT clients that connect to the Message VPN using WebSocket. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`. Available since 2.1.
     */
    serviceMqttWebSocketListenPort?: number;
    /**
     * The handling of Authorization headers for incoming REST connections. The default value is `"drop"`. The allowed values and their meaning are:
     *
     * <pre>
     * "drop" - Do not attach the Authorization header to the message as a user property. This configuration is most secure.
     * "forward" - Forward the Authorization header, attaching it to the message as a user property in the same way as other headers. For best security, use the drop setting.
     * "legacy" - If the Authorization header was used for authentication to the broker, do not attach it to the message. If the Authorization header was not used for authentication to the broker, attach it to the message as a user property in the same way as other headers. For best security, use the drop setting.
     * </pre>
     * Available since 2.19.
     */
    serviceRestIncomingAuthorizationHeaderHandling?: MsgVpn.serviceRestIncomingAuthorizationHeaderHandling;
    /**
     * The maximum number of REST incoming client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform. The default is the maximum value supported by the platform.
     */
    serviceRestIncomingMaxConnectionCount?: number;
    /**
     * Enable or disable the plain-text REST service for incoming clients in the Message VPN. Disabling causes clients currently connected to be disconnected. The default value is `false`.
     */
    serviceRestIncomingPlainTextEnabled?: boolean;
    /**
     * The port number for incoming plain-text REST clients that connect to the Message VPN. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`.
     */
    serviceRestIncomingPlainTextListenPort?: number;
    /**
     * Enable or disable the use of encryption (TLS) for the REST service for incoming clients in the Message VPN. Disabling causes clients currently connected over TLS to be disconnected. The default value is `false`.
     */
    serviceRestIncomingTlsEnabled?: boolean;
    /**
     * The port number for incoming REST clients that connect to the Message VPN over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled. The default value is `0`.
     */
    serviceRestIncomingTlsListenPort?: number;
    /**
     * The REST service mode for incoming REST clients that connect to the Message VPN. The default value is `"messaging"`. The allowed values and their meaning are:
     *
     * <pre>
     * "gateway" - Act as a message gateway through which REST messages are propagated.
     * "messaging" - Act as a message broker on which REST messages are queued.
     * </pre>
     * Available since 2.6.
     */
    serviceRestMode?: MsgVpn.serviceRestMode;
    /**
     * The maximum number of REST Consumer (outgoing) client connections that can be simultaneously connected to the Message VPN. The default varies by platform.
     */
    serviceRestOutgoingMaxConnectionCount?: number;
    /**
     * The maximum number of SMF client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform. The default varies by platform.
     */
    serviceSmfMaxConnectionCount?: number;
    /**
     * Enable or disable the plain-text SMF service in the Message VPN. Disabling causes clients currently connected to be disconnected. The default value is `true`.
     */
    serviceSmfPlainTextEnabled?: boolean;
    /**
     * Enable or disable the use of encryption (TLS) for the SMF service in the Message VPN. Disabling causes clients currently connected over TLS to be disconnected. The default value is `true`.
     */
    serviceSmfTlsEnabled?: boolean;
    /**
     * The maximum number of Web Transport client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform. The default is the maximum value supported by the platform.
     */
    serviceWebMaxConnectionCount?: number;
    /**
     * Enable or disable the plain-text Web Transport service in the Message VPN. Disabling causes clients currently connected to be disconnected. The default value is `true`.
     */
    serviceWebPlainTextEnabled?: boolean;
    /**
     * Enable or disable the use of TLS for the Web Transport service in the Message VPN. Disabling causes clients currently connected over TLS to be disconnected. The default value is `true`.
     */
    serviceWebTlsEnabled?: boolean;
    /**
     * Enable or disable the allowing of TLS SMF clients to downgrade their connections to plain-text connections. Changing this will not affect existing connections. The default value is `false`.
     */
    tlsAllowDowngradeToPlainTextEnabled?: boolean;
}

export namespace MsgVpn {

    /**
     * The type of basic authentication to use for clients connecting to the Message VPN. The default value is `"radius"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Internal database. Authentication is against Client Usernames.
     * "ldap" - LDAP authentication. An LDAP profile name must be provided.
     * "radius" - RADIUS authentication. A RADIUS profile name must be provided.
     * "none" - No authentication. Anonymous login allowed.
     * </pre>
     *
     */
    export enum authenticationBasicType {
        INTERNAL = 'internal',
        LDAP = 'ldap',
        RADIUS = 'radius',
        NONE = 'none',
    }

    /**
     * The desired behavior for client certificate revocation checking. The default value is `"allow-valid"`. The allowed values and their meaning are:
     *
     * <pre>
     * "allow-all" - Allow the client to authenticate, the result of client certificate revocation check is ignored.
     * "allow-unknown" - Allow the client to authenticate even if the revocation status of his certificate cannot be determined.
     * "allow-valid" - Allow the client to authenticate only when the revocation check returned an explicit positive response.
     * </pre>
     * Available since 2.6.
     */
    export enum authenticationClientCertRevocationCheckMode {
        ALLOW_ALL = 'allow-all',
        ALLOW_UNKNOWN = 'allow-unknown',
        ALLOW_VALID = 'allow-valid',
    }

    /**
     * The field from the client certificate to use as the client username. The default value is `"common-name"`. The allowed values and their meaning are:
     *
     * <pre>
     * "common-name" - The username is extracted from the certificate's Common Name.
     * "subject-alternate-name-msupn" - The username is extracted from the certificate's Other Name type of the Subject Alternative Name and must have the msUPN signature.
     * </pre>
     * Available since 2.6.
     */
    export enum authenticationClientCertUsernameSource {
        COMMON_NAME = 'common-name',
        SUBJECT_ALTERNATE_NAME_MSUPN = 'subject-alternate-name-msupn',
    }

    /**
     * The type of authorization to use for clients connecting to the Message VPN. The default value is `"internal"`. The allowed values and their meaning are:
     *
     * <pre>
     * "ldap" - LDAP authorization.
     * "internal" - Internal authorization.
     * </pre>
     *
     */
    export enum authorizationType {
        LDAP = 'ldap',
        INTERNAL = 'internal',
    }

    /**
     * Subscription level Event message publishing mode. The default value is `"off"`. The allowed values and their meaning are:
     *
     * <pre>
     * "off" - Disable client level event message publishing.
     * "on-with-format-v1" - Enable client level event message publishing with format v1.
     * "on-with-no-unsubscribe-events-on-disconnect-format-v1" - As "on-with-format-v1", but unsubscribe events are not generated when a client disconnects. Unsubscribe events are still raised when a client explicitly unsubscribes from its subscriptions.
     * "on-with-format-v2" - Enable client level event message publishing with format v2.
     * "on-with-no-unsubscribe-events-on-disconnect-format-v2" - As "on-with-format-v2", but unsubscribe events are not generated when a client disconnects. Unsubscribe events are still raised when a client explicitly unsubscribes from its subscriptions.
     * </pre>
     *
     */
    export enum eventPublishSubscriptionMode {
        OFF = 'off',
        ON_WITH_FORMAT_V1 = 'on-with-format-v1',
        ON_WITH_NO_UNSUBSCRIBE_EVENTS_ON_DISCONNECT_FORMAT_V1 = 'on-with-no-unsubscribe-events-on-disconnect-format-v1',
        ON_WITH_FORMAT_V2 = 'on-with-format-v2',
        ON_WITH_NO_UNSUBSCRIBE_EVENTS_ON_DISCONNECT_FORMAT_V2 = 'on-with-no-unsubscribe-events-on-disconnect-format-v2',
    }

    /**
     * The authentication scheme for the replication Bridge in the Message VPN. The default value is `"basic"`. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    export enum replicationBridgeAuthenticationScheme {
        BASIC = 'basic',
        CLIENT_CERTIFICATE = 'client-certificate',
    }

    /**
     * The behavior to take when enabling replication for the Message VPN, depending on the existence of the replication Queue. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default value is `"fail-on-existing-queue"`. The allowed values and their meaning are:
     *
     * <pre>
     * "fail-on-existing-queue" - The data replication queue must not already exist.
     * "force-use-existing-queue" - The data replication queue must already exist. Any data messages on the Queue will be forwarded to interested applications. IMPORTANT: Before using this mode be certain that the messages are not stale or otherwise unsuitable to be forwarded. This mode can only be specified when the existing queue is configured the same as is currently specified under replication configuration otherwise the enabling of replication will fail.
     * "force-recreate-queue" - The data replication queue must already exist. Any data messages on the Queue will be discarded. IMPORTANT: Before using this mode be certain that the messages on the existing data replication queue are not needed by interested applications.
     * </pre>
     *
     */
    export enum replicationEnabledQueueBehavior {
        FAIL_ON_EXISTING_QUEUE = 'fail-on-existing-queue',
        FORCE_USE_EXISTING_QUEUE = 'force-use-existing-queue',
        FORCE_RECREATE_QUEUE = 'force-recreate-queue',
    }

    /**
     * The replication role for the Message VPN. The default value is `"standby"`. The allowed values and their meaning are:
     *
     * <pre>
     * "active" - Assume the Active role in replication for the Message VPN.
     * "standby" - Assume the Standby role in replication for the Message VPN.
     * </pre>
     *
     */
    export enum replicationRole {
        ACTIVE = 'active',
        STANDBY = 'standby',
    }

    /**
     * The transaction replication mode for all transactions within the Message VPN. Changing this value during operation will not affect existing transactions; it is only used upon starting a transaction. The default value is `"async"`. The allowed values and their meaning are:
     *
     * <pre>
     * "sync" - Messages are acknowledged when replicated (spooled remotely).
     * "async" - Messages are acknowledged when pending replication (spooled locally).
     * </pre>
     *
     */
    export enum replicationTransactionMode {
        SYNC = 'sync',
        ASYNC = 'async',
    }

    /**
     * The handling of Authorization headers for incoming REST connections. The default value is `"drop"`. The allowed values and their meaning are:
     *
     * <pre>
     * "drop" - Do not attach the Authorization header to the message as a user property. This configuration is most secure.
     * "forward" - Forward the Authorization header, attaching it to the message as a user property in the same way as other headers. For best security, use the drop setting.
     * "legacy" - If the Authorization header was used for authentication to the broker, do not attach it to the message. If the Authorization header was not used for authentication to the broker, attach it to the message as a user property in the same way as other headers. For best security, use the drop setting.
     * </pre>
     * Available since 2.19.
     */
    export enum serviceRestIncomingAuthorizationHeaderHandling {
        DROP = 'drop',
        FORWARD = 'forward',
        LEGACY = 'legacy',
    }

    /**
     * The REST service mode for incoming REST clients that connect to the Message VPN. The default value is `"messaging"`. The allowed values and their meaning are:
     *
     * <pre>
     * "gateway" - Act as a message gateway through which REST messages are propagated.
     * "messaging" - Act as a message broker on which REST messages are queued.
     * </pre>
     * Available since 2.6.
     */
    export enum serviceRestMode {
        GATEWAY = 'gateway',
        MESSAGING = 'messaging',
    }


}

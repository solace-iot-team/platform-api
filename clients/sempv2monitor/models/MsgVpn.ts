/* eslint-disable */


import type { EventThreshold } from './EventThreshold';
import type { EventThresholdByValue } from './EventThresholdByValue';
import type { MsgVpnCounter } from './MsgVpnCounter';
import type { MsgVpnRate } from './MsgVpnRate';

export type MsgVpn = {
    /**
     * The name of another Message VPN which this Message VPN is an alias for. Available since 2.14.
     */
    alias?: string;
    /**
     * Indicates whether basic authentication is enabled for clients connecting to the Message VPN.
     */
    authenticationBasicEnabled?: boolean;
    /**
     * The name of the RADIUS or LDAP Profile to use for basic authentication.
     */
    authenticationBasicProfileName?: string;
    /**
     * The RADIUS domain to use for basic authentication.
     */
    authenticationBasicRadiusDomain?: string;
    /**
     * The type of basic authentication to use for clients connecting to the Message VPN. The allowed values and their meaning are:
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
     * Indicates whether a client is allowed to specify a Client Username via the API connect method. When disabled, the certificate CN (Common Name) is always used.
     */
    authenticationClientCertAllowApiProvidedUsernameEnabled?: boolean;
    /**
     * Indicates whether client certificate authentication is enabled in the Message VPN.
     */
    authenticationClientCertEnabled?: boolean;
    /**
     * The maximum depth for a client certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate.
     */
    authenticationClientCertMaxChainDepth?: number;
    /**
     * The desired behavior for client certificate revocation checking. The allowed values and their meaning are:
     *
     * <pre>
     * "allow-all" - Allow the client to authenticate, the result of client certificate revocation check is ignored.
     * "allow-unknown" - Allow the client to authenticate even if the revocation status of his certificate cannot be determined.
     * "allow-valid" - Allow the client to authenticate only when the revocation check returned an explicit positive response.
     * </pre>
     *
     */
    authenticationClientCertRevocationCheckMode?: MsgVpn.authenticationClientCertRevocationCheckMode;
    /**
     * The field from the client certificate to use as the client username. The allowed values and their meaning are:
     *
     * <pre>
     * "certificate-thumbprint" - The username is computed as the SHA-1 hash over the entire DER-encoded contents of the client certificate.
     * "common-name" - The username is extracted from the certificate's first instance of the Common Name attribute in the Subject DN.
     * "common-name-last" - The username is extracted from the certificate's last instance of the Common Name attribute in the Subject DN.
     * "subject-alternate-name-msupn" - The username is extracted from the certificate's Other Name type of the Subject Alternative Name and must have the msUPN signature.
     * "uid" - The username is extracted from the certificate's first instance of the User Identifier attribute in the Subject DN.
     * "uid-last" - The username is extracted from the certificate's last instance of the User Identifier attribute in the Subject DN.
     * </pre>
     *
     */
    authenticationClientCertUsernameSource?: MsgVpn.authenticationClientCertUsernameSource;
    /**
     * Indicates whether the "Not Before" and "Not After" validity dates in the client certificate are checked.
     */
    authenticationClientCertValidateDateEnabled?: boolean;
    /**
     * Indicates whether a client is allowed to specify a Client Username via the API connect method. When disabled, the Kerberos Principal name is always used.
     */
    authenticationKerberosAllowApiProvidedUsernameEnabled?: boolean;
    /**
     * Indicates whether Kerberos authentication is enabled in the Message VPN.
     */
    authenticationKerberosEnabled?: boolean;
    /**
     * The name of the provider to use when the client does not supply a provider name. Available since 2.13.
     */
    authenticationOauthDefaultProviderName?: string;
    /**
     * Indicates whether OAuth authentication is enabled. Available since 2.13.
     */
    authenticationOauthEnabled?: boolean;
    /**
     * The name of the attribute that is retrieved from the LDAP server as part of the LDAP search when authorizing a client connecting to the Message VPN.
     */
    authorizationLdapGroupMembershipAttributeName?: string;
    /**
     * Indicates whether client-username domain trimming for LDAP lookups of client connections is enabled. Available since 2.13.
     */
    authorizationLdapTrimClientUsernameDomainEnabled?: boolean;
    /**
     * The name of the LDAP Profile to use for client authorization.
     */
    authorizationProfileName?: string;
    /**
     * The type of authorization to use for clients connecting to the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "ldap" - LDAP authorization.
     * "internal" - Internal authorization.
     * </pre>
     *
     */
    authorizationType?: MsgVpn.authorizationType;
    /**
     * The one minute average of the message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the compressed message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    averageRxCompressedByteRate?: number;
    /**
     * The one minute average of the message rate received by the Message VPN, in messages per second (msg/sec). Available since 2.13.
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the uncompressed message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    averageRxUncompressedByteRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the compressed message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    averageTxCompressedByteRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Message VPN, in messages per second (msg/sec). Available since 2.13.
     */
    averageTxMsgRate?: number;
    /**
     * The one minute average of the uncompressed message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    averageTxUncompressedByteRate?: number;
    /**
     * Indicates whether the Common Name (CN) in the server certificate from the remote broker is validated for the Bridge. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    bridgingTlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum depth for a server certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate.
     */
    bridgingTlsServerCertMaxChainDepth?: number;
    /**
     * Indicates whether the "Not Before" and "Not After" validity dates in the server certificate are checked.
     */
    bridgingTlsServerCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable the standard TLS authentication mechanism of verifying the name used to connect to the bridge. If enabled, the name used to connect to the bridge is checked against the names specified in the certificate returned by the remote router. Legacy Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is also enabled. Available since 2.18.
     */
    bridgingTlsServerCertValidateNameEnabled?: boolean;
    /**
     * The key for the config sync table of the local Message VPN. Deprecated since 2.22. This attribute has been deprecated.
     */
    configSyncLocalKey?: string;
    /**
     * The result of the last operation on the config sync table of the local Message VPN. Deprecated since 2.22. This attribute has been replaced by 'lastResult' in the ConfigSyncLocalDatabaseRow object.
     */
    configSyncLocalLastResult?: string;
    /**
     * The role of the config sync table of the local Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "unknown" - The role is unknown.
     * "primary" - Acts as the primary source of config data.
     * "replica" - Acts as a replica of the primary config data.
     * </pre>
     * Deprecated since 2.22. This attribute has been replaced by 'role' in the ConfigSyncLocalDatabaseRow object.
     */
    configSyncLocalRole?: string;
    /**
     * The state of the config sync table of the local Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "unknown" - The state is unknown.
     * "in-sync" - The config data is synchronized between Message VPNs.
     * "reconciling" - The config data is reconciling between Message VPNs.
     * "blocked" - The config data is blocked from reconciling due to an error.
     * "out-of-sync" - The config data is out of sync between Message VPNs.
     * "down" - The state is down due to configuration.
     * </pre>
     * Deprecated since 2.22. This attribute has been replaced by 'syncStatus' in the ConfigSyncLocalDatabaseRow object.
     */
    configSyncLocalState?: string;
    /**
     * The amount of time in seconds the config sync table of the local Message VPN has been in the current state. Deprecated since 2.22. This attribute has been replaced by 'timeInState' in the ConfigSyncLocalDatabaseRow object.
     */
    configSyncLocalTimeInState?: number;
    /**
     * The amount of client control messages received from clients by the Message VPN, in bytes (B). Available since 2.13.
     */
    controlRxByteCount?: number;
    /**
     * The number of client control messages received from clients by the Message VPN. Available since 2.13.
     */
    controlRxMsgCount?: number;
    /**
     * The amount of client control messages transmitted to clients by the Message VPN, in bytes (B). Available since 2.13.
     */
    controlTxByteCount?: number;
    /**
     * The number of client control messages transmitted to clients by the Message VPN. Available since 2.13.
     */
    controlTxMsgCount?: number;
    counter?: MsgVpnCounter;
    /**
     * The amount of client data messages received from clients by the Message VPN, in bytes (B). Available since 2.13.
     */
    dataRxByteCount?: number;
    /**
     * The number of client data messages received from clients by the Message VPN. Available since 2.13.
     */
    dataRxMsgCount?: number;
    /**
     * The amount of client data messages transmitted to clients by the Message VPN, in bytes (B). Available since 2.13.
     */
    dataTxByteCount?: number;
    /**
     * The number of client data messages transmitted to clients by the Message VPN. Available since 2.13.
     */
    dataTxMsgCount?: number;
    /**
     * The number of messages discarded during reception by the Message VPN. Available since 2.13.
     */
    discardedRxMsgCount?: number;
    /**
     * The number of messages discarded during transmission by the Message VPN. Available since 2.13.
     */
    discardedTxMsgCount?: number;
    /**
     * Indicates whether managing of cache instances over the message bus is enabled in the Message VPN.
     */
    distributedCacheManagementEnabled?: boolean;
    /**
     * Indicates whether Dynamic Message Routing (DMR) is enabled for the Message VPN.
     */
    dmrEnabled?: boolean;
    /**
     * Indicates whether the Message VPN is enabled.
     */
    enabled?: boolean;
    eventConnectionCountThreshold?: EventThreshold;
    eventEgressFlowCountThreshold?: EventThreshold;
    eventEgressMsgRateThreshold?: EventThresholdByValue;
    eventEndpointCountThreshold?: EventThreshold;
    eventIngressFlowCountThreshold?: EventThreshold;
    eventIngressMsgRateThreshold?: EventThresholdByValue;
    /**
     * Exceeding this message size in kilobytes (KB) triggers a corresponding Event in the Message VPN.
     */
    eventLargeMsgThreshold?: number;
    /**
     * The value of the prefix applied to all published Events in the Message VPN.
     */
    eventLogTag?: string;
    eventMsgSpoolUsageThreshold?: EventThreshold;
    /**
     * Indicates whether client Events are published in the Message VPN.
     */
    eventPublishClientEnabled?: boolean;
    /**
     * Indicates whether Message VPN Events are published in the Message VPN.
     */
    eventPublishMsgVpnEnabled?: boolean;
    /**
     * The mode of subscription Events published in the Message VPN. The allowed values and their meaning are:
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
     * Indicates whether Message VPN Events are published in the MQTT format.
     */
    eventPublishTopicFormatMqttEnabled?: boolean;
    /**
     * Indicates whether Message VPN Events are published in the SMF format.
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
     * Indicates whether exports of subscriptions to other routers in the network over neighbour links is enabled in the Message VPN.
     */
    exportSubscriptionsEnabled?: boolean;
    /**
     * The reason for the Message VPN failure.
     */
    failureReason?: string;
    /**
     * Indicates whether the JNDI access for clients is enabled in the Message VPN.
     */
    jndiEnabled?: boolean;
    /**
     * The number of login request messages received by the Message VPN. Available since 2.13.
     */
    loginRxMsgCount?: number;
    /**
     * The number of login response messages transmitted by the Message VPN. Available since 2.13.
     */
    loginTxMsgCount?: number;
    /**
     * The maximum number of client connections to the Message VPN.
     */
    maxConnectionCount?: number;
    /**
     * The effective maximum number of Queues and Topic Endpoints allowed in the Message VPN.
     */
    maxEffectiveEndpointCount?: number;
    /**
     * The effective maximum number of receive flows allowed in the Message VPN.
     */
    maxEffectiveRxFlowCount?: number;
    /**
     * The effective maximum number of subscriptions allowed in the Message VPN.
     */
    maxEffectiveSubscriptionCount?: number;
    /**
     * The effective maximum number of transacted sessions allowed in the Message VPN.
     */
    maxEffectiveTransactedSessionCount?: number;
    /**
     * The effective maximum number of transactions allowed in the Message VPN.
     */
    maxEffectiveTransactionCount?: number;
    /**
     * The effective maximum number of transmit flows allowed in the Message VPN.
     */
    maxEffectiveTxFlowCount?: number;
    /**
     * The maximum number of transmit flows that can be created in the Message VPN.
     */
    maxEgressFlowCount?: number;
    /**
     * The maximum number of Queues and Topic Endpoints that can be created in the Message VPN.
     */
    maxEndpointCount?: number;
    /**
     * The maximum number of receive flows that can be created in the Message VPN.
     */
    maxIngressFlowCount?: number;
    /**
     * The maximum message spool usage by the Message VPN, in megabytes.
     */
    maxMsgSpoolUsage?: number;
    /**
     * The maximum number of local client subscriptions that can be added to the Message VPN. This limit is not enforced when a subscription is added using a management interface, such as CLI or SEMP.
     */
    maxSubscriptionCount?: number;
    /**
     * The maximum number of transacted sessions that can be created in the Message VPN.
     */
    maxTransactedSessionCount?: number;
    /**
     * The maximum number of transactions that can be created in the Message VPN.
     */
    maxTransactionCount?: number;
    /**
     * The maximum total memory usage of the MQTT Retain feature for this Message VPN, in MB. If the maximum memory is reached, any arriving retain messages that require more memory are discarded. A value of -1 indicates that the memory is bounded only by the global max memory limit. A value of 0 prevents MQTT Retain from becoming operational.
     */
    mqttRetainMaxMemory?: number;
    /**
     * The number of message replays that are currently active in the Message VPN.
     */
    msgReplayActiveCount?: number;
    /**
     * The number of message replays that are currently failed in the Message VPN.
     */
    msgReplayFailedCount?: number;
    /**
     * The number of message replays that are currently initializing in the Message VPN.
     */
    msgReplayInitializingCount?: number;
    /**
     * The number of message replays that are pending complete in the Message VPN.
     */
    msgReplayPendingCompleteCount?: number;
    /**
     * The current number of messages spooled (persisted in the Message Spool) in the Message VPN. Available since 2.14.
     */
    msgSpoolMsgCount?: number;
    /**
     * The number of guaranteed messages received by the Message VPN. Available since 2.13.
     */
    msgSpoolRxMsgCount?: number;
    /**
     * The number of guaranteed messages transmitted by the Message VPN. One message to multiple clients is counted as one message. Available since 2.13.
     */
    msgSpoolTxMsgCount?: number;
    /**
     * The current message spool usage by the Message VPN, in bytes (B).
     */
    msgSpoolUsage?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    rate?: MsgVpnRate;
    /**
     * The acknowledgement (ACK) propagation interval for the replication Bridge, in number of replicated messages. Available since 2.12.
     */
    replicationAckPropagationIntervalMsgCount?: number;
    /**
     * The number of acknowledgement messages propagated to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveAckPropTxMsgCount?: number;
    /**
     * The number of async messages queued to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveAsyncQueuedMsgCount?: number;
    /**
     * The number of messages consumed in the replication active local Message VPN. Available since 2.12.
     */
    replicationActiveLocallyConsumedMsgCount?: number;
    /**
     * The peak amount of time in seconds the message flow has been congested to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveMateFlowCongestedPeakTime?: number;
    /**
     * The peak amount of time in seconds the message flow has not been congested to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveMateFlowNotCongestedPeakTime?: number;
    /**
     * The number of promoted messages queued to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActivePromotedQueuedMsgCount?: number;
    /**
     * The number of reconcile request messages received from the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveReconcileRequestRxMsgCount?: number;
    /**
     * The peak amount of time in seconds sync replication has been eligible to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveSyncEligiblePeakTime?: number;
    /**
     * The peak amount of time in seconds sync replication has been ineligible to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveSyncIneligiblePeakTime?: number;
    /**
     * The number of sync messages queued as async to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveSyncQueuedAsAsyncMsgCount?: number;
    /**
     * The number of sync messages queued to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveSyncQueuedMsgCount?: number;
    /**
     * The number of sync replication ineligible transitions to the replication standby remote Message VPN. Available since 2.12.
     */
    replicationActiveTransitionToSyncIneligibleCount?: number;
    /**
     * The Client Username the replication Bridge uses to login to the remote Message VPN. Available since 2.12.
     */
    replicationBridgeAuthenticationBasicClientUsername?: string;
    /**
     * The authentication scheme for the replication Bridge in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     * Available since 2.12.
     */
    replicationBridgeAuthenticationScheme?: MsgVpn.replicationBridgeAuthenticationScheme;
    /**
     * Indicates whether the local replication Bridge is bound to the Queue in the remote Message VPN. Available since 2.12.
     */
    replicationBridgeBoundToQueue?: boolean;
    /**
     * Indicates whether compression is used for the replication Bridge. Available since 2.12.
     */
    replicationBridgeCompressedDataEnabled?: boolean;
    /**
     * The size of the window used for guaranteed messages published to the replication Bridge, in messages. Available since 2.12.
     */
    replicationBridgeEgressFlowWindowSize?: number;
    /**
     * The name of the local replication Bridge in the Message VPN. Available since 2.12.
     */
    replicationBridgeName?: string;
    /**
     * The number of seconds that must pass before retrying the replication Bridge connection. Available since 2.12.
     */
    replicationBridgeRetryDelay?: number;
    /**
     * Indicates whether encryption (TLS) is enabled for the replication Bridge connection. Available since 2.12.
     */
    replicationBridgeTlsEnabled?: boolean;
    /**
     * The Client Profile for the unidirectional replication Bridge in the Message VPN. It is used only for the TCP parameters. Available since 2.12.
     */
    replicationBridgeUnidirectionalClientProfileName?: string;
    /**
     * Indicates whether the local replication Bridge is operationally up in the Message VPN. Available since 2.12.
     */
    replicationBridgeUp?: boolean;
    /**
     * Indicates whether replication is enabled for the Message VPN. Available since 2.12.
     */
    replicationEnabled?: boolean;
    /**
     * Indicates whether the remote replication Bridge is bound to the Queue in the Message VPN. Available since 2.12.
     */
    replicationQueueBound?: boolean;
    /**
     * The maximum message spool usage by the replication Bridge local Queue (quota), in megabytes. Available since 2.12.
     */
    replicationQueueMaxMsgSpoolUsage?: number;
    /**
     * Indicates whether messages discarded on this replication Bridge Queue are rejected back to the sender. Available since 2.12.
     */
    replicationQueueRejectMsgToSenderOnDiscardEnabled?: boolean;
    /**
     * Indicates whether guaranteed messages published to synchronously replicated Topics are rejected back to the sender when synchronous replication becomes ineligible. Available since 2.12.
     */
    replicationRejectMsgWhenSyncIneligibleEnabled?: boolean;
    /**
     * The name of the remote replication Bridge in the Message VPN. Available since 2.12.
     */
    replicationRemoteBridgeName?: string;
    /**
     * Indicates whether the remote replication Bridge is operationally up in the Message VPN. Available since 2.12.
     */
    replicationRemoteBridgeUp?: boolean;
    /**
     * The replication role for the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "active" - Assume the Active role in replication for the Message VPN.
     * "standby" - Assume the Standby role in replication for the Message VPN.
     * </pre>
     * Available since 2.12.
     */
    replicationRole?: MsgVpn.replicationRole;
    /**
     * The number of acknowledgement messages received out of sequence from the replication active remote Message VPN. Available since 2.12.
     */
    replicationStandbyAckPropOutOfSeqRxMsgCount?: number;
    /**
     * The number of acknowledgement messages received from the replication active remote Message VPN. Available since 2.12.
     */
    replicationStandbyAckPropRxMsgCount?: number;
    /**
     * The number of reconcile request messages transmitted to the replication active remote Message VPN. Available since 2.12.
     */
    replicationStandbyReconcileRequestTxMsgCount?: number;
    /**
     * The number of messages received from the replication active remote Message VPN. Available since 2.12.
     */
    replicationStandbyRxMsgCount?: number;
    /**
     * The number of transaction requests received from the replication active remote Message VPN. Available since 2.12.
     */
    replicationStandbyTransactionRequestCount?: number;
    /**
     * The number of transaction requests received from the replication active remote Message VPN that failed. Available since 2.12.
     */
    replicationStandbyTransactionRequestFailureCount?: number;
    /**
     * The number of transaction requests received from the replication active remote Message VPN that succeeded. Available since 2.12.
     */
    replicationStandbyTransactionRequestSuccessCount?: number;
    /**
     * Indicates whether sync replication is eligible in the Message VPN. Available since 2.12.
     */
    replicationSyncEligible?: boolean;
    /**
     * Indicates whether synchronous or asynchronous replication mode is used for all transactions within the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "sync" - Messages are acknowledged when replicated (spooled remotely).
     * "async" - Messages are acknowledged when pending replication (spooled locally).
     * </pre>
     * Available since 2.12.
     */
    replicationTransactionMode?: MsgVpn.replicationTransactionMode;
    /**
     * Indicates whether the Common Name (CN) in the server certificate from the remote REST Consumer is validated. Deprecated since 2.17. Common Name validation has been replaced by Server Certificate Name validation.
     */
    restTlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum depth for a REST Consumer server certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate.
     */
    restTlsServerCertMaxChainDepth?: number;
    /**
     * Indicates whether the "Not Before" and "Not After" validity dates in the REST Consumer server certificate are checked.
     */
    restTlsServerCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable the standard TLS authentication mechanism of verifying the name used to connect to the remote REST Consumer. If enabled, the name used to connect to the remote REST Consumer is checked against the names specified in the certificate returned by the remote router. Legacy Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is also enabled. Available since 2.17.
     */
    restTlsServerCertValidateNameEnabled?: boolean;
    /**
     * The amount of messages received from clients by the Message VPN, in bytes (B). Available since 2.12.
     */
    rxByteCount?: number;
    /**
     * The current message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    rxByteRate?: number;
    /**
     * The amount of compressed messages received by the Message VPN, in bytes (B). Available since 2.12.
     */
    rxCompressedByteCount?: number;
    /**
     * The current compressed message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    rxCompressedByteRate?: number;
    /**
     * The compression ratio for messages received by the message VPN. Available since 2.12.
     */
    rxCompressionRatio?: string;
    /**
     * The number of messages received from clients by the Message VPN. Available since 2.12.
     */
    rxMsgCount?: number;
    /**
     * The current message rate received by the Message VPN, in messages per second (msg/sec). Available since 2.13.
     */
    rxMsgRate?: number;
    /**
     * The amount of uncompressed messages received by the Message VPN, in bytes (B). Available since 2.12.
     */
    rxUncompressedByteCount?: number;
    /**
     * The current uncompressed message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    rxUncompressedByteRate?: number;
    /**
     * Indicates whether the "admin" level "client" commands are enabled for SEMP over the message bus in the Message VPN.
     */
    sempOverMsgBusAdminClientEnabled?: boolean;
    /**
     * Indicates whether the "admin" level "Distributed Cache" commands are enabled for SEMP over the message bus in the Message VPN.
     */
    sempOverMsgBusAdminDistributedCacheEnabled?: boolean;
    /**
     * Indicates whether the "admin" level commands are enabled for SEMP over the message bus in the Message VPN.
     */
    sempOverMsgBusAdminEnabled?: boolean;
    /**
     * Indicates whether SEMP over the message bus is enabled in the Message VPN.
     */
    sempOverMsgBusEnabled?: boolean;
    /**
     * Indicates whether the "show" level commands are enabled for SEMP over the message bus in the Message VPN.
     */
    sempOverMsgBusShowEnabled?: boolean;
    /**
     * The maximum number of AMQP client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform.
     */
    serviceAmqpMaxConnectionCount?: number;
    /**
     * Indicates whether the AMQP Service is compressed in the Message VPN.
     */
    serviceAmqpPlainTextCompressed?: boolean;
    /**
     * Indicates whether the AMQP Service is enabled in the Message VPN.
     */
    serviceAmqpPlainTextEnabled?: boolean;
    /**
     * The reason for the AMQP Service failure in the Message VPN.
     */
    serviceAmqpPlainTextFailureReason?: string;
    /**
     * The port number for plain-text AMQP clients that connect to the Message VPN. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceAmqpPlainTextListenPort?: number;
    /**
     * Indicates whether the AMQP Service is operationally up in the Message VPN.
     */
    serviceAmqpPlainTextUp?: boolean;
    /**
     * Indicates whether the TLS related AMQP Service is compressed in the Message VPN.
     */
    serviceAmqpTlsCompressed?: boolean;
    /**
     * Indicates whether encryption (TLS) is enabled for AMQP clients in the Message VPN.
     */
    serviceAmqpTlsEnabled?: boolean;
    /**
     * The reason for the TLS related AMQP Service failure in the Message VPN.
     */
    serviceAmqpTlsFailureReason?: string;
    /**
     * The port number for AMQP clients that connect to the Message VPN over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceAmqpTlsListenPort?: number;
    /**
     * Indicates whether the TLS related AMQP Service is operationally up in the Message VPN.
     */
    serviceAmqpTlsUp?: boolean;
    /**
     * Determines when to request a client certificate from an incoming MQTT client connecting via a TLS port. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "never" - Never ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "when-enabled-in-message-vpn" - Only ask for a client-certificate if client certificate authentication is enabled under "message-vpn >  authentication > client-certificate > shutdown".
     * </pre>
     * Available since 2.21.
     */
    serviceMqttAuthenticationClientCertRequest?: MsgVpn.serviceMqttAuthenticationClientCertRequest;
    /**
     * The maximum number of MQTT client connections that can be simultaneously connected to the Message VPN.
     */
    serviceMqttMaxConnectionCount?: number;
    /**
     * Indicates whether the MQTT Service is compressed in the Message VPN.
     */
    serviceMqttPlainTextCompressed?: boolean;
    /**
     * Indicates whether the MQTT Service is enabled in the Message VPN.
     */
    serviceMqttPlainTextEnabled?: boolean;
    /**
     * The reason for the MQTT Service failure in the Message VPN.
     */
    serviceMqttPlainTextFailureReason?: string;
    /**
     * The port number for plain-text MQTT clients that connect to the Message VPN. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceMqttPlainTextListenPort?: number;
    /**
     * Indicates whether the MQTT Service is operationally up in the Message VPN.
     */
    serviceMqttPlainTextUp?: boolean;
    /**
     * Indicates whether the TLS related MQTT Service is compressed in the Message VPN.
     */
    serviceMqttTlsCompressed?: boolean;
    /**
     * Indicates whether encryption (TLS) is enabled for MQTT clients in the Message VPN.
     */
    serviceMqttTlsEnabled?: boolean;
    /**
     * The reason for the TLS related MQTT Service failure in the Message VPN.
     */
    serviceMqttTlsFailureReason?: string;
    /**
     * The port number for MQTT clients that connect to the Message VPN over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceMqttTlsListenPort?: number;
    /**
     * Indicates whether the TLS related MQTT Service is operationally up in the Message VPN.
     */
    serviceMqttTlsUp?: boolean;
    /**
     * Indicates whether the TLS related Web transport MQTT Service is compressed in the Message VPN.
     */
    serviceMqttTlsWebSocketCompressed?: boolean;
    /**
     * Indicates whether encryption (TLS) is enabled for MQTT Web clients in the Message VPN.
     */
    serviceMqttTlsWebSocketEnabled?: boolean;
    /**
     * The reason for the TLS related Web transport MQTT Service failure in the Message VPN.
     */
    serviceMqttTlsWebSocketFailureReason?: string;
    /**
     * The port number for MQTT clients that connect to the Message VPN using WebSocket over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceMqttTlsWebSocketListenPort?: number;
    /**
     * Indicates whether the TLS related Web transport MQTT Service is operationally up in the Message VPN.
     */
    serviceMqttTlsWebSocketUp?: boolean;
    /**
     * Indicates whether the Web transport related MQTT Service is compressed in the Message VPN.
     */
    serviceMqttWebSocketCompressed?: boolean;
    /**
     * Indicates whether the Web transport for the SMF Service is enabled in the Message VPN.
     */
    serviceMqttWebSocketEnabled?: boolean;
    /**
     * The reason for the Web transport related MQTT Service failure in the Message VPN.
     */
    serviceMqttWebSocketFailureReason?: string;
    /**
     * The port number for plain-text MQTT clients that connect to the Message VPN using WebSocket. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceMqttWebSocketListenPort?: number;
    /**
     * Indicates whether the Web transport related MQTT Service is operationally up in the Message VPN.
     */
    serviceMqttWebSocketUp?: boolean;
    /**
     * Determines when to request a client certificate from an incoming REST Producer connecting via a TLS port. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "never" - Never ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "when-enabled-in-message-vpn" - Only ask for a client-certificate if client certificate authentication is enabled under "message-vpn >  authentication > client-certificate > shutdown".
     * </pre>
     * Available since 2.21.
     */
    serviceRestIncomingAuthenticationClientCertRequest?: MsgVpn.serviceRestIncomingAuthenticationClientCertRequest;
    /**
     * The handling of Authorization headers for incoming REST connections. The allowed values and their meaning are:
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
     * The maximum number of REST incoming client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform.
     */
    serviceRestIncomingMaxConnectionCount?: number;
    /**
     * Indicates whether the incoming REST Service is compressed in the Message VPN.
     */
    serviceRestIncomingPlainTextCompressed?: boolean;
    /**
     * Indicates whether the REST Service is enabled in the Message VPN for incoming clients.
     */
    serviceRestIncomingPlainTextEnabled?: boolean;
    /**
     * The reason for the incoming REST Service failure in the Message VPN.
     */
    serviceRestIncomingPlainTextFailureReason?: string;
    /**
     * The port number for incoming plain-text REST clients that connect to the Message VPN. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceRestIncomingPlainTextListenPort?: number;
    /**
     * Indicates whether the incoming REST Service is operationally up in the Message VPN.
     */
    serviceRestIncomingPlainTextUp?: boolean;
    /**
     * Indicates whether the TLS related incoming REST Service is compressed in the Message VPN.
     */
    serviceRestIncomingTlsCompressed?: boolean;
    /**
     * Indicates whether encryption (TLS) is enabled for incoming REST clients in the Message VPN.
     */
    serviceRestIncomingTlsEnabled?: boolean;
    /**
     * The reason for the TLS related incoming REST Service failure in the Message VPN.
     */
    serviceRestIncomingTlsFailureReason?: string;
    /**
     * The port number for incoming REST clients that connect to the Message VPN over TLS. The port must be unique across the message backbone. A value of 0 means that the listen-port is unassigned and cannot be enabled.
     */
    serviceRestIncomingTlsListenPort?: number;
    /**
     * Indicates whether the TLS related incoming REST Service is operationally up in the Message VPN.
     */
    serviceRestIncomingTlsUp?: boolean;
    /**
     * The REST service mode for incoming REST clients that connect to the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "gateway" - Act as a message gateway through which REST messages are propagated.
     * "messaging" - Act as a message broker on which REST messages are queued.
     * </pre>
     *
     */
    serviceRestMode?: MsgVpn.serviceRestMode;
    /**
     * The maximum number of REST Consumer (outgoing) client connections that can be simultaneously connected to the Message VPN.
     */
    serviceRestOutgoingMaxConnectionCount?: number;
    /**
     * The maximum number of SMF client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform.
     */
    serviceSmfMaxConnectionCount?: number;
    /**
     * Indicates whether the SMF Service is enabled in the Message VPN.
     */
    serviceSmfPlainTextEnabled?: boolean;
    /**
     * The reason for the SMF Service failure in the Message VPN.
     */
    serviceSmfPlainTextFailureReason?: string;
    /**
     * Indicates whether the SMF Service is operationally up in the Message VPN.
     */
    serviceSmfPlainTextUp?: boolean;
    /**
     * Indicates whether encryption (TLS) is enabled for SMF clients in the Message VPN.
     */
    serviceSmfTlsEnabled?: boolean;
    /**
     * The reason for the TLS related SMF Service failure in the Message VPN.
     */
    serviceSmfTlsFailureReason?: string;
    /**
     * Indicates whether the TLS related SMF Service is operationally up in the Message VPN.
     */
    serviceSmfTlsUp?: boolean;
    /**
     * Determines when to request a client certificate from a Web Transport client connecting via a TLS port. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "never" - Never ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "when-enabled-in-message-vpn" - Only ask for a client-certificate if client certificate authentication is enabled under "message-vpn >  authentication > client-certificate > shutdown".
     * </pre>
     * Available since 2.21.
     */
    serviceWebAuthenticationClientCertRequest?: MsgVpn.serviceWebAuthenticationClientCertRequest;
    /**
     * The maximum number of Web Transport client connections that can be simultaneously connected to the Message VPN. This value may be higher than supported by the platform.
     */
    serviceWebMaxConnectionCount?: number;
    /**
     * Indicates whether the Web transport for the SMF Service is enabled in the Message VPN.
     */
    serviceWebPlainTextEnabled?: boolean;
    /**
     * The reason for the Web transport related SMF Service failure in the Message VPN.
     */
    serviceWebPlainTextFailureReason?: string;
    /**
     * Indicates whether the Web transport for the SMF Service is operationally up in the Message VPN.
     */
    serviceWebPlainTextUp?: boolean;
    /**
     * Indicates whether TLS is enabled for SMF clients in the Message VPN that use the Web transport.
     */
    serviceWebTlsEnabled?: boolean;
    /**
     * The reason for the TLS related Web transport SMF Service failure in the Message VPN.
     */
    serviceWebTlsFailureReason?: string;
    /**
     * Indicates whether the TLS related Web transport SMF Service is operationally up in the Message VPN.
     */
    serviceWebTlsUp?: boolean;
    /**
     * The operational state of the local Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "up" - The Message VPN is operationally up.
     * "down" - The Message VPN is operationally down.
     * "standby" - The Message VPN is operationally replication standby.
     * </pre>
     *
     */
    state?: string;
    /**
     * The progress of the subscription export task, in percent complete.
     */
    subscriptionExportProgress?: number;
    /**
     * Indicates whether the Message VPN is the system manager for handling system level SEMP get requests and system level event publishing.
     */
    systemManager?: boolean;
    /**
     * Indicates whether SMF clients connected to the Message VPN are allowed to downgrade their connections from TLS to plain text.
     */
    tlsAllowDowngradeToPlainTextEnabled?: boolean;
    /**
     * The one minute average of the TLS message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    tlsAverageRxByteRate?: number;
    /**
     * The one minute average of the TLS message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    tlsAverageTxByteRate?: number;
    /**
     * The amount of TLS messages received by the Message VPN, in bytes (B). Available since 2.13.
     */
    tlsRxByteCount?: number;
    /**
     * The current TLS message rate received by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    tlsRxByteRate?: number;
    /**
     * The amount of TLS messages transmitted by the Message VPN, in bytes (B). Available since 2.13.
     */
    tlsTxByteCount?: number;
    /**
     * The current TLS message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    tlsTxByteRate?: number;
    /**
     * The amount of messages transmitted to clients by the Message VPN, in bytes (B). Available since 2.12.
     */
    txByteCount?: number;
    /**
     * The current message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.13.
     */
    txByteRate?: number;
    /**
     * The amount of compressed messages transmitted by the Message VPN, in bytes (B). Available since 2.12.
     */
    txCompressedByteCount?: number;
    /**
     * The current compressed message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    txCompressedByteRate?: number;
    /**
     * The compression ratio for messages transmitted by the message VPN. Available since 2.12.
     */
    txCompressionRatio?: string;
    /**
     * The number of messages transmitted to clients by the Message VPN. Available since 2.12.
     */
    txMsgCount?: number;
    /**
     * The current message rate transmitted by the Message VPN, in messages per second (msg/sec). Available since 2.13.
     */
    txMsgRate?: number;
    /**
     * The amount of uncompressed messages transmitted by the Message VPN, in bytes (B). Available since 2.12.
     */
    txUncompressedByteCount?: number;
    /**
     * The current uncompressed message rate transmitted by the Message VPN, in bytes per second (B/sec). Available since 2.12.
     */
    txUncompressedByteRate?: number;
}

export namespace MsgVpn {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpn';

    /**
     * The type of basic authentication to use for clients connecting to the Message VPN. The allowed values and their meaning are:
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
     * The desired behavior for client certificate revocation checking. The allowed values and their meaning are:
     *
     * <pre>
     * "allow-all" - Allow the client to authenticate, the result of client certificate revocation check is ignored.
     * "allow-unknown" - Allow the client to authenticate even if the revocation status of his certificate cannot be determined.
     * "allow-valid" - Allow the client to authenticate only when the revocation check returned an explicit positive response.
     * </pre>
     *
     */
    export enum authenticationClientCertRevocationCheckMode {
        ALLOW_ALL = 'allow-all',
        ALLOW_UNKNOWN = 'allow-unknown',
        ALLOW_VALID = 'allow-valid',
    }

    /**
     * The field from the client certificate to use as the client username. The allowed values and their meaning are:
     *
     * <pre>
     * "certificate-thumbprint" - The username is computed as the SHA-1 hash over the entire DER-encoded contents of the client certificate.
     * "common-name" - The username is extracted from the certificate's first instance of the Common Name attribute in the Subject DN.
     * "common-name-last" - The username is extracted from the certificate's last instance of the Common Name attribute in the Subject DN.
     * "subject-alternate-name-msupn" - The username is extracted from the certificate's Other Name type of the Subject Alternative Name and must have the msUPN signature.
     * "uid" - The username is extracted from the certificate's first instance of the User Identifier attribute in the Subject DN.
     * "uid-last" - The username is extracted from the certificate's last instance of the User Identifier attribute in the Subject DN.
     * </pre>
     *
     */
    export enum authenticationClientCertUsernameSource {
        CERTIFICATE_THUMBPRINT = 'certificate-thumbprint',
        COMMON_NAME = 'common-name',
        COMMON_NAME_LAST = 'common-name-last',
        SUBJECT_ALTERNATE_NAME_MSUPN = 'subject-alternate-name-msupn',
        UID = 'uid',
        UID_LAST = 'uid-last',
    }

    /**
     * The type of authorization to use for clients connecting to the Message VPN. The allowed values and their meaning are:
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
     * The mode of subscription Events published in the Message VPN. The allowed values and their meaning are:
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
     * The authentication scheme for the replication Bridge in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     * Available since 2.12.
     */
    export enum replicationBridgeAuthenticationScheme {
        BASIC = 'basic',
        CLIENT_CERTIFICATE = 'client-certificate',
    }

    /**
     * The replication role for the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "active" - Assume the Active role in replication for the Message VPN.
     * "standby" - Assume the Standby role in replication for the Message VPN.
     * </pre>
     * Available since 2.12.
     */
    export enum replicationRole {
        ACTIVE = 'active',
        STANDBY = 'standby',
    }

    /**
     * Indicates whether synchronous or asynchronous replication mode is used for all transactions within the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "sync" - Messages are acknowledged when replicated (spooled remotely).
     * "async" - Messages are acknowledged when pending replication (spooled locally).
     * </pre>
     * Available since 2.12.
     */
    export enum replicationTransactionMode {
        SYNC = 'sync',
        ASYNC = 'async',
    }

    /**
     * Determines when to request a client certificate from an incoming MQTT client connecting via a TLS port. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "never" - Never ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "when-enabled-in-message-vpn" - Only ask for a client-certificate if client certificate authentication is enabled under "message-vpn >  authentication > client-certificate > shutdown".
     * </pre>
     * Available since 2.21.
     */
    export enum serviceMqttAuthenticationClientCertRequest {
        ALWAYS = 'always',
        NEVER = 'never',
        WHEN_ENABLED_IN_MESSAGE_VPN = 'when-enabled-in-message-vpn',
    }

    /**
     * Determines when to request a client certificate from an incoming REST Producer connecting via a TLS port. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "never" - Never ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "when-enabled-in-message-vpn" - Only ask for a client-certificate if client certificate authentication is enabled under "message-vpn >  authentication > client-certificate > shutdown".
     * </pre>
     * Available since 2.21.
     */
    export enum serviceRestIncomingAuthenticationClientCertRequest {
        ALWAYS = 'always',
        NEVER = 'never',
        WHEN_ENABLED_IN_MESSAGE_VPN = 'when-enabled-in-message-vpn',
    }

    /**
     * The handling of Authorization headers for incoming REST connections. The allowed values and their meaning are:
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
     * The REST service mode for incoming REST clients that connect to the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "gateway" - Act as a message gateway through which REST messages are propagated.
     * "messaging" - Act as a message broker on which REST messages are queued.
     * </pre>
     *
     */
    export enum serviceRestMode {
        GATEWAY = 'gateway',
        MESSAGING = 'messaging',
    }

    /**
     * Determines when to request a client certificate from a Web Transport client connecting via a TLS port. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "never" - Never ask for a client certificate regardless of the "message-vpn > authentication > client-certificate > shutdown" configuration.
     * "when-enabled-in-message-vpn" - Only ask for a client-certificate if client certificate authentication is enabled under "message-vpn >  authentication > client-certificate > shutdown".
     * </pre>
     * Available since 2.21.
     */
    export enum serviceWebAuthenticationClientCertRequest {
        ALWAYS = 'always',
        NEVER = 'never',
        WHEN_ENABLED_IN_MESSAGE_VPN = 'when-enabled-in-message-vpn',
    }


}
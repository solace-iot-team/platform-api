/* eslint-disable */


import type { EventThreshold } from './EventThreshold';
import type { EventThresholdByPercent } from './EventThresholdByPercent';

export type Broker = {
    /**
     * The client certificate revocation checking mode used when a client authenticates with a client certificate. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Do not perform any certificate revocation checking.
     * "ocsp" - Use the Open Certificate Status Protcol (OCSP) for certificate revocation checking.
     * "crl" - Use Certificate Revocation Lists (CRL) for certificate revocation checking.
     * "ocsp-crl" - Use OCSP first, but if OCSP fails to return an unambiguous result, then check via CRL.
     * </pre>
     *
     */
    authClientCertRevocationCheckMode?: Broker.authClientCertRevocationCheckMode;
    /**
     * The one minute average of the message rate received by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the compressed message rate received by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    averageRxCompressedByteRate?: number;
    /**
     * The one minute average of the message rate received by the Broker, in messages per second (msg/sec). Available since 2.14.
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the uncompressed message rate received by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    averageRxUncompressedByteRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the compressed message rate transmitted by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    averageTxCompressedByteRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Broker, in messages per second (msg/sec). Available since 2.14.
     */
    averageTxMsgRate?: number;
    /**
     * The one minute average of the uncompressed message rate transmitted by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    averageTxUncompressedByteRate?: number;
    /**
     * The maximum depth for a client certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. Available since 2.22.
     */
    configSyncAuthenticationClientCertMaxChainDepth?: number;
    /**
     * Enable or disable validation of the "Not Before" and "Not After" validity dates in the authentication certificate(s). Available since 2.22.
     */
    configSyncAuthenticationClientCertValidateDateEnabled?: boolean;
    /**
     * The TCP initial congestion window size for Config Sync clients, in multiples of the TCP Maximum Segment Size (MSS). Changing the value from its default of 2 results in non-compliance with RFC 2581. Contact Solace Support before changing this value. Available since 2.22.
     */
    configSyncClientProfileTcpInitialCongestionWindow?: number;
    /**
     * The number of TCP keepalive retransmissions to a client using the Client Profile before declaring that it is not available. Available since 2.22.
     */
    configSyncClientProfileTcpKeepaliveCount?: number;
    /**
     * The amount of time a client connection using the Client Profile must remain idle before TCP begins sending keepalive probes, in seconds. Available since 2.22.
     */
    configSyncClientProfileTcpKeepaliveIdle?: number;
    /**
     * The amount of time between TCP keepalive retransmissions to a client using the Client Profile when no acknowledgement is received, in seconds. Available since 2.22.
     */
    configSyncClientProfileTcpKeepaliveInterval?: number;
    /**
     * The TCP maximum window size for clients using the Client Profile, in kilobytes. Changes are applied to all existing connections. Available since 2.22.
     */
    configSyncClientProfileTcpMaxWindow?: number;
    /**
     * The TCP maximum segment size for clients using the Client Profile, in bytes. Changes are applied to all existing connections. Available since 2.22.
     */
    configSyncClientProfileTcpMss?: number;
    /**
     * Enable or disable configuration synchronization for High Availability or Disaster Recovery. Available since 2.22.
     */
    configSyncEnabled?: boolean;
    /**
     * The reason for the last transition to a "Down" operational status. On transitions to the "Up" operational status this value is cleared. Available since 2.22.
     */
    configSyncLastFailureReason?: string;
    /**
     * Enable or disable the synchronizing of usernames within High Availability groups. The transition from not synchronizing to synchronizing will cause the High Availability mate to fall out of sync. Recommendation: leave this as enabled. Available since 2.22.
     */
    configSyncSynchronizeUsernameEnabled?: boolean;
    /**
     * Enable or disable the use of TLS encryption of the configuration synchronization communications between brokers in High Availability groups and/or Disaster Recovery sites. Available since 2.22.
     */
    configSyncTlsEnabled?: boolean;
    /**
     * Indicates whether the configuration synchronization facility is operational. "True" indicates the facility is Up, otherwise it is Down. When "False" the configSyncLastFailureReason will provide further detail. Available since 2.22.
     */
    configSyncUp?: boolean;
    /**
     * The current CSPF version. Available since 2.17.
     */
    cspfVersion?: number;
    /**
     * An approximation of the amount of disk space consumed, but not used, by the persisted data. Calculated as a percentage of total space. Available since 2.18.
     */
    guaranteedMsgingDefragmentationEstimatedFragmentation?: number;
    /**
     * An approximation of the amount of disk space recovered upon a successfully completed execution of a defragmentation operation. Expressed in MB. Available since 2.18.
     */
    guaranteedMsgingDefragmentationEstimatedRecoverableSpace?: number;
    /**
     * A timestamp reflecting when the last defragmentation completed. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.18.
     */
    guaranteedMsgingDefragmentationLastCompletedOn?: number;
    /**
     * How much of the message spool was visited during the last defragmentation operation. This number reflects the percentage of the message spool visited in terms of disk space (as opposed to, for example, spool files). Available since 2.18.
     */
    guaranteedMsgingDefragmentationLastCompletionPercentage?: number;
    /**
     * Reflects how the last defragmentation operation completed. The allowed values and their meaning are:
     *
     * <pre>
     * "success" - Defragmentation completed successfully.
     * "unmovable-local-transaction" - Defragmentation stopped after encountering an unmovable local transaction.
     * "unmovable-xa-transaction" - Defragmentation stopped after encountering an unmovable XA transaction.
     * "incomplete" - Defragmentation stopped prematurely.
     * "stopped-by-administrator" - Defragmentation stopped by administrator.
     * </pre>
     * Available since 2.18.
     */
    guaranteedMsgingDefragmentationLastExitCondition?: string;
    /**
     * Optional additional information regarding the exit condition of the last defragmentation operation. Available since 2.18.
     */
    guaranteedMsgingDefragmentationLastExitConditionInformation?: string;
    /**
     * Defragmentation status of guaranteed messaging. The allowed values and their meaning are:
     *
     * <pre>
     * "idle" - Defragmentation is not currently running.
     * "pending" - Degfragmentation is preparing to run.
     * "active" - Defragmentation is in progress.
     * </pre>
     * Available since 2.18.
     */
    guaranteedMsgingDefragmentationStatus?: string;
    /**
     * The estimated completion percentage of a defragmentation operation currently in progress. Only valid if the defragmentation status is "Active". Available since 2.18.
     */
    guaranteedMsgingDefragmentationStatusActiveCompletionPercentage?: number;
    /**
     * Enable or disable Guaranteed Messaging. Available since 2.18.
     */
    guaranteedMsgingEnabled?: boolean;
    guaranteedMsgingEventCacheUsageThreshold?: EventThreshold;
    guaranteedMsgingEventDeliveredUnackedThreshold?: EventThresholdByPercent;
    guaranteedMsgingEventDiskUsageThreshold?: EventThresholdByPercent;
    guaranteedMsgingEventEgressFlowCountThreshold?: EventThreshold;
    guaranteedMsgingEventEndpointCountThreshold?: EventThreshold;
    guaranteedMsgingEventIngressFlowCountThreshold?: EventThreshold;
    guaranteedMsgingEventMsgCountThreshold?: EventThresholdByPercent;
    guaranteedMsgingEventMsgSpoolFileCountThreshold?: EventThresholdByPercent;
    guaranteedMsgingEventMsgSpoolUsageThreshold?: EventThreshold;
    guaranteedMsgingEventTransactedSessionCountThreshold?: EventThreshold;
    guaranteedMsgingEventTransactedSessionResourceCountThreshold?: EventThresholdByPercent;
    guaranteedMsgingEventTransactionCountThreshold?: EventThreshold;
    /**
     * Guaranteed messaging cache usage limit. Expressed as a maximum percentage of the NAB's egress queueing. resources that the guaranteed message cache is allowed to use. Available since 2.18.
     */
    guaranteedMsgingMaxCacheUsage?: number;
    /**
     * The maximum total message spool usage allowed across all VPNs on this broker, in megabytes. Recommendation: the maximum value should be less than 90% of the disk space allocated for the guaranteed message spool. Available since 2.18.
     */
    guaranteedMsgingMaxMsgSpoolUsage?: number;
    /**
     * The maximum time, in milliseconds, that can be tolerated for remote acknowledgement of synchronization messages before which the remote system will be considered out of sync. Available since 2.18.
     */
    guaranteedMsgingMsgSpoolSyncMirroredMsgAckTimeout?: number;
    /**
     * The maximum time, in milliseconds, that can be tolerated for remote disk writes before which the remote system will be considered out of sync. Available since 2.18.
     */
    guaranteedMsgingMsgSpoolSyncMirroredSpoolFileAckTimeout?: number;
    /**
     * Operational status of guaranteed messaging. The allowed values and their meaning are:
     *
     * <pre>
     * "disabled" - The operational status of guaranteed messaging is Disabled.
     * "not-ready" - The operational status of guaranteed messaging is NotReady.
     * "standby" - The operational status of guaranteed messaging is Standby.
     * "activating" - The operational status of guaranteed messaging is Activating.
     * "active" - The operational status of guaranteed messaging is Active.
     * </pre>
     * Available since 2.18.
     */
    guaranteedMsgingOperationalStatus?: string;
    /**
     * The replication compatibility mode for the router. The default value is `"legacy"`. The allowed values and their meaning are:"legacy" - All transactions originated by clients are replicated to the standby site without using transactions."transacted" - All transactions originated by clients are replicated to the standby site using transactions. The allowed values and their meaning are:
     *
     * <pre>
     * "legacy" - All transactions originated by clients are replicated to the standby site without using transactions.
     * "transacted" - All transactions originated by clients are replicated to the standby site using transactions.
     * </pre>
     * Available since 2.18.
     */
    guaranteedMsgingTransactionReplicationCompatibilityMode?: Broker.guaranteedMsgingTransactionReplicationCompatibilityMode;
    /**
     * The amount of messages received from clients by the Broker, in bytes (B). Available since 2.14.
     */
    rxByteCount?: number;
    /**
     * The current message rate received by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    rxByteRate?: number;
    /**
     * The amount of compressed messages received by the Broker, in bytes (B). Available since 2.14.
     */
    rxCompressedByteCount?: number;
    /**
     * The current compressed message rate received by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    rxCompressedByteRate?: number;
    /**
     * The compression ratio for messages received by the Broker. Available since 2.14.
     */
    rxCompressionRatio?: string;
    /**
     * The number of messages received from clients by the Broker. Available since 2.14.
     */
    rxMsgCount?: number;
    /**
     * The current message rate received by the Broker, in messages per second (msg/sec). Available since 2.14.
     */
    rxMsgRate?: number;
    /**
     * The amount of uncompressed messages received by the Broker, in bytes (B). Available since 2.14.
     */
    rxUncompressedByteCount?: number;
    /**
     * The current uncompressed message rate received by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    rxUncompressedByteRate?: number;
    /**
     * Enable or disable the AMQP service. When disabled new AMQP Clients may not connect through the global or per-VPN AMQP listen-ports, and all currently connected AMQP Clients are immediately disconnected. Available since 2.17.
     */
    serviceAmqpEnabled?: boolean;
    /**
     * TCP port number that AMQP clients can use to connect to the broker using raw TCP over TLS. Available since 2.17.
     */
    serviceAmqpTlsListenPort?: number;
    serviceEventConnectionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the health-check service. Available since 2.17.
     */
    serviceHealthCheckEnabled?: boolean;
    /**
     * The port number for the health-check service. The port must be unique across the message backbone. The health-check service must be disabled to change the port. Available since 2.17.
     */
    serviceHealthCheckListenPort?: number;
    /**
     * Enable or disable the mate-link service. Available since 2.17.
     */
    serviceMateLinkEnabled?: boolean;
    /**
     * The port number for the mate-link service. The port must be unique across the message backbone. The mate-link service must be disabled to change the port. Available since 2.17.
     */
    serviceMateLinkListenPort?: number;
    /**
     * Enable or disable the MQTT service. When disabled new MQTT Clients may not connect through the per-VPN MQTT listen-ports, and all currently connected MQTT Clients are immediately disconnected. Available since 2.17.
     */
    serviceMqttEnabled?: boolean;
    /**
     * Enable or disable the msg-backbone service. When disabled new Clients may not connect through global or per-VPN listen-ports, and all currently connected Clients are immediately disconnected. Available since 2.17.
     */
    serviceMsgBackboneEnabled?: boolean;
    /**
     * Enable or disable the redundancy service. Available since 2.17.
     */
    serviceRedundancyEnabled?: boolean;
    /**
     * The first listen-port used for the redundancy service. Redundancy uses this port and the subsequent 2 ports. These port must be unique across the message backbone. The redundancy service must be disabled to change this port. Available since 2.17.
     */
    serviceRedundancyFirstListenPort?: number;
    serviceRestEventOutgoingConnectionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the REST service incoming connections on the router. Available since 2.17.
     */
    serviceRestIncomingEnabled?: boolean;
    /**
     * Enable or disable the REST service outgoing connections on the router. Available since 2.17.
     */
    serviceRestOutgoingEnabled?: boolean;
    /**
     * Enable or disable extended SEMP timeouts for paged GETs. When a request times out, it returns the current page of content, even if the page is not full.  When enabled, the timeout is 60 seconds. When disabled, the timeout is 5 seconds.  The recommended setting is disabled (no legacy-timeout).  This parameter is intended as a temporary workaround to be used until SEMP clients can handle short pages.  This setting will be removed in a future release. Available since 2.18.
     */
    serviceSempLegacyTimeoutEnabled?: boolean;
    /**
     * Enable or disable plain-text SEMP service. Available since 2.17.
     */
    serviceSempPlainTextEnabled?: boolean;
    /**
     * The TCP port for plain-text SEMP client connections. Available since 2.17.
     */
    serviceSempPlainTextListenPort?: number;
    /**
     * The session idle timeout, in minutes. Sessions will be invalidated if there is no activity in this period of time. Available since 2.21.
     */
    serviceSempSessionIdleTimeout?: number;
    /**
     * The maximum lifetime of a session, in minutes. Sessions will be invalidated after this period of time, regardless of activity. Available since 2.21.
     */
    serviceSempSessionMaxLifetime?: number;
    /**
     * Enable or disable TLS SEMP service. Available since 2.17.
     */
    serviceSempTlsEnabled?: boolean;
    /**
     * The TCP port for TLS SEMP client connections. Available since 2.17.
     */
    serviceSempTlsListenPort?: number;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw compression TCP. Available since 2.17.
     */
    serviceSmfCompressionListenPort?: number;
    /**
     * Enable or disable the SMF service. When disabled new SMF Clients may not connect through the global listen-ports, and all currently connected SMF Clients are immediately disconnected. Available since 2.17.
     */
    serviceSmfEnabled?: boolean;
    serviceSmfEventConnectionCountThreshold?: EventThreshold;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw TCP. Available since 2.17.
     */
    serviceSmfPlainTextListenPort?: number;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw routing control TCP. Available since 2.17.
     */
    serviceSmfRoutingControlListenPort?: number;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw TCP over TLS. Available since 2.17.
     */
    serviceSmfTlsListenPort?: number;
    serviceTlsEventConnectionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the web-transport service. When disabled new web-transport Clients may not connect through the global listen-ports, and all currently connected web-transport Clients are immediately disconnected. Available since 2.17.
     */
    serviceWebTransportEnabled?: boolean;
    /**
     * The TCP port for plain-text WEB client connections. Available since 2.17.
     */
    serviceWebTransportPlainTextListenPort?: number;
    /**
     * The TCP port for TLS WEB client connections. Available since 2.17.
     */
    serviceWebTransportTlsListenPort?: number;
    /**
     * Used to specify the Web URL suffix that will be used by Web clients when communicating with the broker. Available since 2.17.
     */
    serviceWebTransportWebUrlSuffix?: string;
    /**
     * Indicates whether TLS version 1.1 connections are blocked. When blocked, all existing incoming and outgoing TLS 1.1 connections with Clients, SEMP users, and LDAP servers remain connected while new connections are blocked. Note that support for TLS 1.1 will eventually be discontinued, at which time TLS 1.1 connections will be blocked regardless of this setting.
     */
    tlsBlockVersion11Enabled?: boolean;
    /**
     * The colon-separated list of default cipher suites for TLS management connections.
     */
    tlsCipherSuiteManagementDefaultList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS management connections (e.g. SEMP, LDAP). The value "default" implies all supported suites ordered from most secure to least secure.
     */
    tlsCipherSuiteManagementList?: string;
    /**
     * The colon-separated list of supported cipher suites for TLS management connections.
     */
    tlsCipherSuiteManagementSupportedList?: string;
    /**
     * The colon-separated list of default cipher suites for TLS data connections.
     */
    tlsCipherSuiteMsgBackboneDefaultList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS data connections (e.g. client pub/sub). The value "default" implies all supported suites ordered from most secure to least secure.
     */
    tlsCipherSuiteMsgBackboneList?: string;
    /**
     * The colon-separated list of supported cipher suites for TLS data connections.
     */
    tlsCipherSuiteMsgBackboneSupportedList?: string;
    /**
     * The colon-separated list of default cipher suites for TLS secure shell connections.
     */
    tlsCipherSuiteSecureShellDefaultList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS secure shell connections (e.g. SSH, SFTP, SCP). The value "default" implies all supported suites ordered from most secure to least secure.
     */
    tlsCipherSuiteSecureShellList?: string;
    /**
     * The colon-separated list of supported cipher suites for TLS secure shell connections.
     */
    tlsCipherSuiteSecureShellSupportedList?: string;
    /**
     * Indicates whether protection against the CRIME exploit is enabled. When enabled, TLS+compressed messaging performance is degraded. This protection should only be disabled if sufficient ACL and authentication features are being employed such that a potential attacker does not have sufficient access to trigger the exploit.
     */
    tlsCrimeExploitProtectionEnabled?: boolean;
    /**
     * Enable or disable the standard domain certificate authority list. Available since 2.19.
     */
    tlsStandardDomainCertificateAuthoritiesEnabled?: boolean;
    /**
     * The TLS ticket lifetime in seconds. When a client connects with TLS, a session with a session ticket is created using the TLS ticket lifetime which determines how long the client has to resume the session.
     */
    tlsTicketLifetime?: number;
    /**
     * The comma-separated list of supported TLS versions.
     */
    tlsVersionSupportedList?: string;
    /**
     * The amount of messages transmitted to clients by the Broker, in bytes (B). Available since 2.14.
     */
    txByteCount?: number;
    /**
     * The current message rate transmitted by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    txByteRate?: number;
    /**
     * The amount of compressed messages transmitted by the Broker, in bytes (B). Available since 2.14.
     */
    txCompressedByteCount?: number;
    /**
     * The current compressed message rate transmitted by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    txCompressedByteRate?: number;
    /**
     * The compression ratio for messages transmitted by the Broker. Available since 2.14.
     */
    txCompressionRatio?: string;
    /**
     * The number of messages transmitted to clients by the Broker. Available since 2.14.
     */
    txMsgCount?: number;
    /**
     * The current message rate transmitted by the Broker, in messages per second (msg/sec). Available since 2.14.
     */
    txMsgRate?: number;
    /**
     * The amount of uncompressed messages transmitted by the Broker, in bytes (B). Available since 2.14.
     */
    txUncompressedByteCount?: number;
    /**
     * The current uncompressed message rate transmitted by the Broker, in bytes per second (B/sec). Available since 2.14.
     */
    txUncompressedByteRate?: number;
}

export namespace Broker {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Broker';

    /**
     * The client certificate revocation checking mode used when a client authenticates with a client certificate. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Do not perform any certificate revocation checking.
     * "ocsp" - Use the Open Certificate Status Protcol (OCSP) for certificate revocation checking.
     * "crl" - Use Certificate Revocation Lists (CRL) for certificate revocation checking.
     * "ocsp-crl" - Use OCSP first, but if OCSP fails to return an unambiguous result, then check via CRL.
     * </pre>
     *
     */
    export enum authClientCertRevocationCheckMode {
        NONE = 'none',
        OCSP = 'ocsp',
        CRL = 'crl',
        OCSP_CRL = 'ocsp-crl',
    }

    /**
     * The replication compatibility mode for the router. The default value is `"legacy"`. The allowed values and their meaning are:"legacy" - All transactions originated by clients are replicated to the standby site without using transactions."transacted" - All transactions originated by clients are replicated to the standby site using transactions. The allowed values and their meaning are:
     *
     * <pre>
     * "legacy" - All transactions originated by clients are replicated to the standby site without using transactions.
     * "transacted" - All transactions originated by clients are replicated to the standby site using transactions.
     * </pre>
     * Available since 2.18.
     */
    export enum guaranteedMsgingTransactionReplicationCompatibilityMode {
        LEGACY = 'legacy',
        TRANSACTED = 'transacted',
    }


}
/* eslint-disable */


import type { EventThreshold } from './EventThreshold';
import type { EventThresholdByPercent } from './EventThresholdByPercent';

export type Broker = {
    /**
     * The client certificate revocation checking mode used when a client authenticates with a client certificate. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
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
     * The maximum depth for a client certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. The default value is `3`. Available since 2.22.
     */
    configSyncAuthenticationClientCertMaxChainDepth?: number;
    /**
     * Enable or disable validation of the "Not Before" and "Not After" validity dates in the authentication certificate(s). The default value is `true`. Available since 2.22.
     */
    configSyncAuthenticationClientCertValidateDateEnabled?: boolean;
    /**
     * The TCP initial congestion window size for Config Sync clients, in multiples of the TCP Maximum Segment Size (MSS). Changing the value from its default of 2 results in non-compliance with RFC 2581. Contact support before changing this value. The default value is `2`. Available since 2.22.
     */
    configSyncClientProfileTcpInitialCongestionWindow?: number;
    /**
     * The number of TCP keepalive retransmissions to a client using the Client Profile before declaring that it is not available. The default value is `5`. Available since 2.22.
     */
    configSyncClientProfileTcpKeepaliveCount?: number;
    /**
     * The amount of time a client connection using the Client Profile must remain idle before TCP begins sending keepalive probes, in seconds. The default value is `3`. Available since 2.22.
     */
    configSyncClientProfileTcpKeepaliveIdle?: number;
    /**
     * The amount of time between TCP keepalive retransmissions to a client using the Client Profile when no acknowledgement is received, in seconds. The default value is `1`. Available since 2.22.
     */
    configSyncClientProfileTcpKeepaliveInterval?: number;
    /**
     * The TCP maximum window size for clients using the Client Profile, in kilobytes. Changes are applied to all existing connections. The default value is `256`. Available since 2.22.
     */
    configSyncClientProfileTcpMaxWindow?: number;
    /**
     * The TCP maximum segment size for clients using the Client Profile, in bytes. Changes are applied to all existing connections. The default value is `1460`. Available since 2.22.
     */
    configSyncClientProfileTcpMss?: number;
    /**
     * Enable or disable configuration synchronization for High Availability or Disaster Recovery. The default value is `false`. Available since 2.22.
     */
    configSyncEnabled?: boolean;
    /**
     * Enable or disable the synchronizing of usernames within High Availability groups. The transition from not synchronizing to synchronizing will cause the High Availability mate to fall out of sync. Recommendation: leave this as enabled. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`. Available since 2.22.
     */
    configSyncSynchronizeUsernameEnabled?: boolean;
    /**
     * Enable or disable the use of TLS encryption of the configuration synchronization communications between brokers in High Availability groups and/or Disaster Recovery sites. The default value is `false`. Available since 2.22.
     */
    configSyncTlsEnabled?: boolean;
    /**
     * The days of the week to schedule defragmentation runs, specified as "daily" or as a comma-separated list of days. Days must be specified as "Sun", "Mon", "Tue", "Wed", "Thu", "Fri, or "Sat", with no spaces, and in sorted order from Sunday to Saturday. Please note "Sun,Mon,Tue,Wed,Thu,Fri,Sat" is not allowed, use "daily" instead. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"daily"`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationScheduleDayList?: string;
    /**
     * Enable or disable schedule-based defragmentation of Guaranteed Messaging spool files. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationScheduleEnabled?: boolean;
    /**
     * The times of the day to schedule defragmentation runs, specified as "hourly" or as a comma-separated list of 24-hour times in the form hh:mm, or h:mm. There must be no spaces, and times (up to 4) must be in sorted order from 0:00 to 23:59. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"0:00"`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationScheduleTimeList?: string;
    /**
     * Enable or disable threshold-based defragmentation of Guaranteed Messaging spool files. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationThresholdEnabled?: boolean;
    /**
     * Percentage of spool fragmentation needed to trigger defragmentation run. The minimum value allowed is 30%. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `50`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationThresholdFragmentationPercentage?: number;
    /**
     * Minimum interval of time (in minutes) between defragmentation runs triggered by thresholds. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `15`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationThresholdMinInterval?: number;
    /**
     * Percentage of spool usage needed to trigger defragmentation run. The minimum value allowed is 30%. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `50`. Available since 2.25.
     */
    guaranteedMsgingDefragmentationThresholdUsagePercentage?: number;
    /**
     * Enable or disable Guaranteed Messaging. The default value is `false`. Available since 2.18.
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
     * Guaranteed messaging cache usage limit. Expressed as a maximum percentage of the NAB's egress queueing. resources that the guaranteed message cache is allowed to use. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `10`. Available since 2.18.
     */
    guaranteedMsgingMaxCacheUsage?: number;
    /**
     * The maximum total message spool usage allowed across all VPNs on this broker, in megabytes. Recommendation: the maximum value should be less than 90% of the disk space allocated for the guaranteed message spool. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `1500`. Available since 2.18.
     */
    guaranteedMsgingMaxMsgSpoolUsage?: number;
    /**
     * The maximum time, in milliseconds, that can be tolerated for remote acknowledgement of synchronization messages before which the remote system will be considered out of sync. The default value is `10000`. Available since 2.18.
     */
    guaranteedMsgingMsgSpoolSyncMirroredMsgAckTimeout?: number;
    /**
     * The maximum time, in milliseconds, that can be tolerated for remote disk writes before which the remote system will be considered out of sync. The default value is `10000`. Available since 2.18.
     */
    guaranteedMsgingMsgSpoolSyncMirroredSpoolFileAckTimeout?: number;
    /**
     * The replication compatibility mode for the router. The default value is `"legacy"`. The allowed values and their meaning are:"legacy" - All transactions originated by clients are replicated to the standby site without using transactions."transacted" - All transactions originated by clients are replicated to the standby site using transactions. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"legacy"`. The allowed values and their meaning are:
     *
     * <pre>
     * "legacy" - All transactions originated by clients are replicated to the standby site without using transactions.
     * "transacted" - All transactions originated by clients are replicated to the standby site using transactions.
     * </pre>
     * Available since 2.18.
     */
    guaranteedMsgingTransactionReplicationCompatibilityMode?: Broker.guaranteedMsgingTransactionReplicationCompatibilityMode;
    /**
     * The default OAuth profile for OAuth authenticated SEMP requests. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`. Available since 2.24.
     */
    oauthProfileDefault?: string;
    /**
     * Enable or disable the AMQP service. When disabled new AMQP Clients may not connect through the global or per-VPN AMQP listen-ports, and all currently connected AMQP Clients are immediately disconnected. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.17.
     */
    serviceAmqpEnabled?: boolean;
    /**
     * TCP port number that AMQP clients can use to connect to the broker using raw TCP over TLS. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `0`. Available since 2.17.
     */
    serviceAmqpTlsListenPort?: number;
    serviceEventConnectionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the health-check service. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.17.
     */
    serviceHealthCheckEnabled?: boolean;
    /**
     * The port number for the health-check service. The port must be unique across the message backbone. The health-check service must be disabled to change the port. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `5550`. Available since 2.17.
     */
    serviceHealthCheckListenPort?: number;
    /**
     * Enable or disable the mate-link service. The default value is `true`. Available since 2.17.
     */
    serviceMateLinkEnabled?: boolean;
    /**
     * The port number for the mate-link service. The port must be unique across the message backbone. The mate-link service must be disabled to change the port. The default value is `8741`. Available since 2.17.
     */
    serviceMateLinkListenPort?: number;
    /**
     * Enable or disable the MQTT service. When disabled new MQTT Clients may not connect through the per-VPN MQTT listen-ports, and all currently connected MQTT Clients are immediately disconnected. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.17.
     */
    serviceMqttEnabled?: boolean;
    /**
     * Enable or disable the msg-backbone service. When disabled new Clients may not connect through global or per-VPN listen-ports, and all currently connected Clients are immediately disconnected. The default value is `true`. Available since 2.17.
     */
    serviceMsgBackboneEnabled?: boolean;
    /**
     * Enable or disable the redundancy service. The default value is `true`. Available since 2.17.
     */
    serviceRedundancyEnabled?: boolean;
    /**
     * The first listen-port used for the redundancy service. Redundancy uses this port and the subsequent 2 ports. These port must be unique across the message backbone. The redundancy service must be disabled to change this port. The default value is `8300`. Available since 2.17.
     */
    serviceRedundancyFirstListenPort?: number;
    serviceRestEventOutgoingConnectionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the REST service incoming connections on the router. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.17.
     */
    serviceRestIncomingEnabled?: boolean;
    /**
     * Enable or disable the REST service outgoing connections on the router. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.17.
     */
    serviceRestOutgoingEnabled?: boolean;
    /**
     * Enable or disable cross origin resource requests for the SEMP service. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`. Available since 2.24.
     */
    serviceSempCorsAllowAnyHostEnabled?: boolean;
    /**
     * Enable or disable extended SEMP timeouts for paged GETs. When a request times out, it returns the current page of content, even if the page is not full.  When enabled, the timeout is 60 seconds. When disabled, the timeout is 5 seconds.  The recommended setting is disabled (no legacy-timeout).  This parameter is intended as a temporary workaround to be used until SEMP clients can handle short pages.  This setting will be removed in a future release. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.18.
     */
    serviceSempLegacyTimeoutEnabled?: boolean;
    /**
     * Enable or disable plain-text SEMP service. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`. Available since 2.17.
     */
    serviceSempPlainTextEnabled?: boolean;
    /**
     * The TCP port for plain-text SEMP client connections. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `80`. Available since 2.17.
     */
    serviceSempPlainTextListenPort?: number;
    /**
     * The session idle timeout, in minutes. Sessions will be invalidated if there is no activity in this period of time. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `15`. Available since 2.21.
     */
    serviceSempSessionIdleTimeout?: number;
    /**
     * The maximum lifetime of a session, in minutes. Sessions will be invalidated after this period of time, regardless of activity. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `43200`. Available since 2.21.
     */
    serviceSempSessionMaxLifetime?: number;
    /**
     * Enable or disable TLS SEMP service. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`. Available since 2.17.
     */
    serviceSempTlsEnabled?: boolean;
    /**
     * The TCP port for TLS SEMP client connections. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `1943`. Available since 2.17.
     */
    serviceSempTlsListenPort?: number;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw compression TCP. The default value is `55003`. Available since 2.17.
     */
    serviceSmfCompressionListenPort?: number;
    /**
     * Enable or disable the SMF service. When disabled new SMF Clients may not connect through the global listen-ports, and all currently connected SMF Clients are immediately disconnected. The default value is `true`. Available since 2.17.
     */
    serviceSmfEnabled?: boolean;
    serviceSmfEventConnectionCountThreshold?: EventThreshold;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw TCP. The default value is `55555`. Available since 2.17.
     */
    serviceSmfPlainTextListenPort?: number;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw routing control TCP. The default value is `55556`. Available since 2.17.
     */
    serviceSmfRoutingControlListenPort?: number;
    /**
     * TCP port number that SMF clients can use to connect to the broker using raw TCP over TLS. The default value is `55443`. Available since 2.17.
     */
    serviceSmfTlsListenPort?: number;
    serviceTlsEventConnectionCountThreshold?: EventThreshold;
    /**
     * Enable or disable the web-transport service. When disabled new web-transport Clients may not connect through the global listen-ports, and all currently connected web-transport Clients are immediately disconnected. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.17.
     */
    serviceWebTransportEnabled?: boolean;
    /**
     * The TCP port for plain-text WEB client connections. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `8008`. Available since 2.17.
     */
    serviceWebTransportPlainTextListenPort?: number;
    /**
     * The TCP port for TLS WEB client connections. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `1443`. Available since 2.17.
     */
    serviceWebTransportTlsListenPort?: number;
    /**
     * Used to specify the Web URL suffix that will be used by Web clients when communicating with the broker. The default value is `""`. Available since 2.17.
     */
    serviceWebTransportWebUrlSuffix?: string;
    /**
     * Enable or disable the blocking of TLS version 1.1 connections. When blocked, all existing incoming and outgoing TLS 1.1 connections with Clients, SEMP users, and LDAP servers remain connected while new connections are blocked. Note that support for TLS 1.1 will eventually be discontinued, at which time TLS 1.1 connections will be blocked regardless of this setting. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`.
     */
    tlsBlockVersion11Enabled?: boolean;
    /**
     * The colon-separated list of cipher suites used for TLS management connections (e.g. SEMP, LDAP). The value "default" implies all supported suites ordered from most secure to least secure. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"default"`.
     */
    tlsCipherSuiteManagementList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS data connections (e.g. client pub/sub). The value "default" implies all supported suites ordered from most secure to least secure. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"default"`.
     */
    tlsCipherSuiteMsgBackboneList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS secure shell connections (e.g. SSH, SFTP, SCP). The value "default" implies all supported suites ordered from most secure to least secure. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"default"`.
     */
    tlsCipherSuiteSecureShellList?: string;
    /**
     * Enable or disable protection against the CRIME exploit. When enabled, TLS+compressed messaging performance is degraded. This protection should only be disabled if sufficient ACL and authentication features are being employed such that a potential attacker does not have sufficient access to trigger the exploit. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    tlsCrimeExploitProtectionEnabled?: boolean;
    /**
     * The PEM formatted content for the server certificate used for TLS connections. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    tlsServerCertContent?: string;
    /**
     * The password for the server certificate used for TLS connections. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    tlsServerCertPassword?: string;
    /**
     * Enable or disable the standard domain certificate authority list. The default value is `true`. Available since 2.19.
     */
    tlsStandardDomainCertificateAuthoritiesEnabled?: boolean;
    /**
     * The TLS ticket lifetime in seconds. When a client connects with TLS, a session with a session ticket is created using the TLS ticket lifetime which determines how long the client has to resume the session. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `86400`.
     */
    tlsTicketLifetime?: number;
    /**
     * Enable or disable the use of unencrypted wizards in the Web-based Manager UI. This setting should be left at its default on all production systems or other systems that need to be secure.  Enabling this option will permit the broker to forward plain-text data to other brokers, making important information or credentials available for snooping. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Available since 2.28.
     */
    webManagerAllowUnencryptedWizardsEnabled?: boolean;
    /**
     * Reserved for internal use by Solace. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`. Available since 2.25.
     */
    webManagerCustomization?: string;
    /**
     * Enable or disable redirection of HTTP requests for the broker manager to HTTPS. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`. Available since 2.24.
     */
    webManagerRedirectHttpEnabled?: boolean;
    /**
     * The HTTPS port that HTTP requests will be redirected towards in a HTTP 301 redirect response. Zero is a special value that means use the value specified for the SEMP TLS port value. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `0`. Available since 2.24.
     */
    webManagerRedirectHttpOverrideTlsPort?: number;
}

export namespace Broker {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Broker';

    /**
     * The client certificate revocation checking mode used when a client authenticates with a client certificate. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
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
     * The replication compatibility mode for the router. The default value is `"legacy"`. The allowed values and their meaning are:"legacy" - All transactions originated by clients are replicated to the standby site without using transactions."transacted" - All transactions originated by clients are replicated to the standby site using transactions. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"legacy"`. The allowed values and their meaning are:
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
/* eslint-disable */


import type { EventThreshold } from './EventThreshold';
import type { EventThresholdByPercent } from './EventThresholdByPercent';

export type MsgVpnClientProfile = {
    /**
     * Enable or disable allowing Bridge clients using the Client Profile to connect. Changing this setting does not affect existing Bridge client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    allowBridgeConnectionsEnabled?: boolean;
    /**
     * Enable or disable allowing clients using the Client Profile to bind to endpoints with the cut-through forwarding delivery mode. Changing this value does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Deprecated since 2.22. This attribute has been deprecated. Please visit the Solace Product Lifecycle Policy web page for details on deprecated features.
     */
    allowCutThroughForwardingEnabled?: boolean;
    /**
     * The types of Queues and Topic Endpoints that clients using the client-profile can create. Changing this value does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"all"`. The allowed values and their meaning are:
     *
     * <pre>
     * "all" - Client can create any type of endpoint.
     * "durable" - Client can create only durable endpoints.
     * "non-durable" - Client can create only non-durable endpoints.
     * </pre>
     * Available since 2.14.
     */
    allowGuaranteedEndpointCreateDurability?: MsgVpnClientProfile.allowGuaranteedEndpointCreateDurability;
    /**
     * Enable or disable allowing clients using the Client Profile to create topic endponts or queues. Changing this value does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    allowGuaranteedEndpointCreateEnabled?: boolean;
    /**
     * Enable or disable allowing clients using the Client Profile to receive guaranteed messages. Changing this setting does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    allowGuaranteedMsgReceiveEnabled?: boolean;
    /**
     * Enable or disable allowing clients using the Client Profile to send guaranteed messages. Changing this setting does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    allowGuaranteedMsgSendEnabled?: boolean;
    /**
     * Enable or disable allowing shared subscriptions. Changing this setting does not affect existing subscriptions. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Available since 2.11.
     */
    allowSharedSubscriptionsEnabled?: boolean;
    /**
     * Enable or disable allowing clients using the Client Profile to establish transacted sessions. Changing this setting does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    allowTransactedSessionsEnabled?: boolean;
    /**
     * The name of a queue to copy settings from when a new queue is created by a client using the Client Profile. The referenced queue must exist in the Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.14. This attribute has been replaced with `apiQueueManagementCopyFromOnCreateTemplateName`.
     */
    apiQueueManagementCopyFromOnCreateName?: string;
    /**
     * The name of a queue template to copy settings from when a new queue is created by a client using the Client Profile. If the referenced queue template does not exist, queue creation will fail when it tries to resolve this template. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.14.
     */
    apiQueueManagementCopyFromOnCreateTemplateName?: string;
    /**
     * The name of a topic endpoint to copy settings from when a new topic endpoint is created by a client using the Client Profile. The referenced topic endpoint must exist in the Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Deprecated since 2.14. This attribute has been replaced with `apiTopicEndpointManagementCopyFromOnCreateTemplateName`.
     */
    apiTopicEndpointManagementCopyFromOnCreateName?: string;
    /**
     * The name of a topic endpoint template to copy settings from when a new topic endpoint is created by a client using the Client Profile. If the referenced topic endpoint template does not exist, topic endpoint creation will fail when it tries to resolve this template. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`. Available since 2.14.
     */
    apiTopicEndpointManagementCopyFromOnCreateTemplateName?: string;
    /**
     * The name of the Client Profile.
     */
    clientProfileName?: string;
    /**
     * Enable or disable allowing clients using the Client Profile to use compression. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`. Available since 2.10.
     */
    compressionEnabled?: boolean;
    /**
     * The amount of time to delay the delivery of messages to clients using the Client Profile after the initial message has been delivered (the eliding delay interval), in milliseconds. A value of 0 means there is no delay in delivering messages to clients. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `0`.
     */
    elidingDelay?: number;
    /**
     * Enable or disable message eliding for clients using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    elidingEnabled?: boolean;
    /**
     * The maximum number of topics tracked for message eliding per client connection using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `256`.
     */
    elidingMaxTopicCount?: number;
    eventClientProvisionedEndpointSpoolUsageThreshold?: EventThresholdByPercent;
    eventConnectionCountPerClientUsernameThreshold?: EventThreshold;
    eventEgressFlowCountThreshold?: EventThreshold;
    eventEndpointCountPerClientUsernameThreshold?: EventThreshold;
    eventIngressFlowCountThreshold?: EventThreshold;
    eventServiceSmfConnectionCountPerClientUsernameThreshold?: EventThreshold;
    eventServiceWebConnectionCountPerClientUsernameThreshold?: EventThreshold;
    eventSubscriptionCountThreshold?: EventThreshold;
    eventTransactedSessionCountThreshold?: EventThreshold;
    eventTransactionCountThreshold?: EventThreshold;
    /**
     * The maximum number of client connections per Client Username using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default is the maximum value supported by the platform.
     */
    maxConnectionCountPerClientUsername?: number;
    /**
     * The maximum number of transmit flows that can be created by one client using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1000`.
     */
    maxEgressFlowCount?: number;
    /**
     * The maximum number of queues and topic endpoints that can be created by clients with the same Client Username using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1000`.
     */
    maxEndpointCountPerClientUsername?: number;
    /**
     * The maximum number of receive flows that can be created by one client using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1000`.
     */
    maxIngressFlowCount?: number;
    /**
     * The maximum number of publisher and consumer messages combined that is allowed within a transaction for each client associated with this client-profile. Exceeding this limit will result in a transaction prepare or commit failure. Changing this value during operation will not affect existing sessions. It is only validated at transaction creation time. Large transactions consume more resources and are more likely to require retrieving messages from the ADB or from disk to process the transaction prepare or commit requests. The transaction processing rate may diminish if a large number of messages must be retrieved from the ADB or from disk. Care should be taken to not use excessively large transactions needlessly to avoid exceeding resource limits and to avoid reducing the overall broker performance. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `256`. Available since 2.20.
     */
    maxMsgsPerTransaction?: number;
    /**
     * The maximum number of subscriptions per client using the Client Profile. This limit is not enforced when a client adds a subscription to an endpoint, except for MQTT QoS 1 subscriptions. In addition, this limit is not enforced when a subscription is added using a management interface, such as CLI or SEMP. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default varies by platform.
     */
    maxSubscriptionCount?: number;
    /**
     * The maximum number of transacted sessions that can be created by one client using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `10`.
     */
    maxTransactedSessionCount?: number;
    /**
     * The maximum number of transactions that can be created by one client using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default varies by platform.
     */
    maxTransactionCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The maximum depth of the "Control 1" (C-1) priority queue, in work units. Each work unit is 2048 bytes of message data. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `20000`.
     */
    queueControl1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Control 1" (C-1) priority queue, regardless of the `queueControl1MaxDepth` value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `4`.
     */
    queueControl1MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 1" (D-1) priority queue, in work units. Each work unit is 2048 bytes of message data. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `20000`.
     */
    queueDirect1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 1" (D-1) priority queue, regardless of the `queueDirect1MaxDepth` value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `4`.
     */
    queueDirect1MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 2" (D-2) priority queue, in work units. Each work unit is 2048 bytes of message data. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `20000`.
     */
    queueDirect2MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 2" (D-2) priority queue, regardless of the `queueDirect2MaxDepth` value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `4`.
     */
    queueDirect2MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 3" (D-3) priority queue, in work units. Each work unit is 2048 bytes of message data. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `20000`.
     */
    queueDirect3MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 3" (D-3) priority queue, regardless of the `queueDirect3MaxDepth` value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `4`.
     */
    queueDirect3MinMsgBurst?: number;
    /**
     * The maximum depth of the "Guaranteed 1" (G-1) priority queue, in work units. Each work unit is 2048 bytes of message data. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `20000`.
     */
    queueGuaranteed1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Guaranteed 1" (G-3) priority queue, regardless of the `queueGuaranteed1MaxDepth` value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `255`.
     */
    queueGuaranteed1MinMsgBurst?: number;
    /**
     * Enable or disable the sending of a negative acknowledgement (NACK) to a client using the Client Profile when discarding a guaranteed message due to no matching subscription found. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Available since 2.2.
     */
    rejectMsgToSenderOnNoSubscriptionMatchEnabled?: boolean;
    /**
     * Enable or disable allowing clients using the Client Profile to connect to the Message VPN when its replication state is standby. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    replicationAllowClientConnectWhenStandbyEnabled?: boolean;
    /**
     * The minimum client keepalive timeout which will be enforced for client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `30`. Available since 2.19.
     */
    serviceMinKeepaliveTimeout?: number;
    /**
     * The maximum number of SMF client connections per Client Username using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default is the maximum value supported by the platform.
     */
    serviceSmfMaxConnectionCountPerClientUsername?: number;
    /**
     * Enable or disable the enforcement of a minimum keepalive timeout for SMF clients. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Available since 2.19.
     */
    serviceSmfMinKeepaliveEnabled?: boolean;
    /**
     * The timeout for inactive Web Transport client sessions using the Client Profile, in seconds. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `30`.
     */
    serviceWebInactiveTimeout?: number;
    /**
     * The maximum number of Web Transport client connections per Client Username using the Client Profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default is the maximum value supported by the platform.
     */
    serviceWebMaxConnectionCountPerClientUsername?: number;
    /**
     * The maximum Web Transport payload size before fragmentation occurs for clients using the Client Profile, in bytes. The size of the header is not included. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1000000`.
     */
    serviceWebMaxPayload?: number;
    /**
     * The TCP initial congestion window size for clients using the Client Profile, in multiples of the TCP Maximum Segment Size (MSS). Changing the value from its default of 2 results in non-compliance with RFC 2581. Contact support before changing this value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `2`.
     */
    tcpCongestionWindowSize?: number;
    /**
     * The number of TCP keepalive retransmissions to a client using the Client Profile before declaring that it is not available. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `5`.
     */
    tcpKeepaliveCount?: number;
    /**
     * The amount of time a client connection using the Client Profile must remain idle before TCP begins sending keepalive probes, in seconds. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `3`.
     */
    tcpKeepaliveIdleTime?: number;
    /**
     * The amount of time between TCP keepalive retransmissions to a client using the Client Profile when no acknowledgement is received, in seconds. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1`.
     */
    tcpKeepaliveInterval?: number;
    /**
     * The TCP maximum segment size for clients using the Client Profile, in bytes. Changes are applied to all existing connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1460`.
     */
    tcpMaxSegmentSize?: number;
    /**
     * The TCP maximum window size for clients using the Client Profile, in kilobytes. Changes are applied to all existing connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `256`.
     */
    tcpMaxWindowSize?: number;
    /**
     * Enable or disable allowing a client using the Client Profile to downgrade an encrypted connection to plain text. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`. Available since 2.8.
     */
    tlsAllowDowngradeToPlainTextEnabled?: boolean;
}

export namespace MsgVpnClientProfile {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientProfile';

    /**
     * The types of Queues and Topic Endpoints that clients using the client-profile can create. Changing this value does not affect existing client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"all"`. The allowed values and their meaning are:
     *
     * <pre>
     * "all" - Client can create any type of endpoint.
     * "durable" - Client can create only durable endpoints.
     * "non-durable" - Client can create only non-durable endpoints.
     * </pre>
     * Available since 2.14.
     */
    export enum allowGuaranteedEndpointCreateDurability {
        ALL = 'all',
        DURABLE = 'durable',
        NON_DURABLE = 'non-durable',
    }


}
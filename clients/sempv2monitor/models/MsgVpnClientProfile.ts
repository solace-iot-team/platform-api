/* eslint-disable */


import type { EventThreshold } from './EventThreshold';
import type { EventThresholdByPercent } from './EventThresholdByPercent';

export type MsgVpnClientProfile = {
    /**
     * Indicates whether Bridge clients using the Client Profile are allowed to connect.
     */
    allowBridgeConnectionsEnabled?: boolean;
    /**
     * Indicates whether clients using the Client Profile are allowed to bind to endpoints with the cut-through forwarding delivery mode. Deprecated since 2.22. This attribute has been deprecated. Please visit the Solace Product Lifecycle Policy web page for details on deprecated features.
     */
    allowCutThroughForwardingEnabled?: boolean;
    /**
     * Indicates whether clients using the Client Profile are allowed to create durable and/or non-durable topic endponts or queues. The allowed values and their meaning are:
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
     * Indicates whether clients using the Client Profile are allowed to create topic endponts or queues.
     */
    allowGuaranteedEndpointCreateEnabled?: boolean;
    /**
     * Indicates whether clients using the Client Profile are allowed to receive guaranteed messages.
     */
    allowGuaranteedMsgReceiveEnabled?: boolean;
    /**
     * Indicates whether clients using the Client Profile are allowed to send guaranteed messages.
     */
    allowGuaranteedMsgSendEnabled?: boolean;
    /**
     * Indicates whether shared subscriptions are allowed. Changing this setting does not affect existing subscriptions.
     */
    allowSharedSubscriptionsEnabled?: boolean;
    /**
     * Indicates whether clients using the Client Profile are allowed to establish transacted sessions.
     */
    allowTransactedSessionsEnabled?: boolean;
    /**
     * The name of a queue to copy settings from when a new queue is created by a client using the Client Profile. The referenced queue must exist in the Message VPN. Deprecated since 2.14. This attribute has been replaced with `apiQueueManagementCopyFromOnCreateTemplateName`.
     */
    apiQueueManagementCopyFromOnCreateName?: string;
    /**
     * The name of a queue template to copy settings from when a new queue is created by a client using the Client Profile. If the referenced queue template does not exist, queue creation will fail when it tries to resolve this template. Available since 2.14.
     */
    apiQueueManagementCopyFromOnCreateTemplateName?: string;
    /**
     * The name of a topic endpoint to copy settings from when a new topic endpoint is created by a client using the Client Profile. The referenced topic endpoint must exist in the Message VPN. Deprecated since 2.14. This attribute has been replaced with `apiTopicEndpointManagementCopyFromOnCreateTemplateName`.
     */
    apiTopicEndpointManagementCopyFromOnCreateName?: string;
    /**
     * The name of a topic endpoint template to copy settings from when a new topic endpoint is created by a client using the Client Profile. If the referenced topic endpoint template does not exist, topic endpoint creation will fail when it tries to resolve this template. Available since 2.14.
     */
    apiTopicEndpointManagementCopyFromOnCreateTemplateName?: string;
    /**
     * The name of the Client Profile.
     */
    clientProfileName?: string;
    /**
     * Indicates whether clients using the Client Profile are allowed to use compression.
     */
    compressionEnabled?: boolean;
    /**
     * The amount of time to delay the delivery of messages to clients using the Client Profile after the initial message has been delivered (the eliding delay interval), in milliseconds. A value of 0 means there is no delay in delivering messages to clients.
     */
    elidingDelay?: number;
    /**
     * Indicates whether message eliding is enabled for clients using the Client Profile.
     */
    elidingEnabled?: boolean;
    /**
     * The maximum number of topics tracked for message eliding per client connection using the Client Profile.
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
     * The maximum number of client connections per Client Username using the Client Profile.
     */
    maxConnectionCountPerClientUsername?: number;
    /**
     * The effective maximum number of queues and topic endpoints per Client Username using the Client Profile.
     */
    maxEffectiveEndpointCount?: number;
    /**
     * The effective maximum number of receive flows per client using the Client Profile.
     */
    maxEffectiveRxFlowCount?: number;
    /**
     * The effective maximum number of subscriptions per client using the Client Profile.
     */
    maxEffectiveSubscriptionCount?: number;
    /**
     * The effective maximum number of transacted sessions per client using the Client Profile.
     */
    maxEffectiveTransactedSessionCount?: number;
    /**
     * The effective maximum number of transactions per client using the Client Profile.
     */
    maxEffectiveTransactionCount?: number;
    /**
     * The effective maximum number of transmit flows per client using the Client Profile.
     */
    maxEffectiveTxFlowCount?: number;
    /**
     * The maximum number of transmit flows that can be created by one client using the Client Profile.
     */
    maxEgressFlowCount?: number;
    /**
     * The maximum number of queues and topic endpoints that can be created by clients with the same Client Username using the Client Profile.
     */
    maxEndpointCountPerClientUsername?: number;
    /**
     * The maximum number of receive flows that can be created by one client using the Client Profile.
     */
    maxIngressFlowCount?: number;
    /**
     * The maximum number of publisher and consumer messages combined that is allowed within a transaction for each client associated with this client-profile. Exceeding this limit will result in a transaction prepare or commit failure. Changing this value during operation will not affect existing sessions. It is only validated at transaction creation time. Large transactions consume more resources and are more likely to require retrieving messages from the ADB or from disk to process the transaction prepare or commit requests. The transaction processing rate may diminish if a large number of messages must be retrieved from the ADB or from disk. Care should be taken to not use excessively large transactions needlessly to avoid exceeding resource limits and to avoid reducing the overall broker performance. Available since 2.20.
     */
    maxMsgsPerTransaction?: number;
    /**
     * The maximum number of subscriptions per client using the Client Profile. This limit is not enforced when a client adds a subscription to an endpoint, except for MQTT QoS 1 subscriptions. In addition, this limit is not enforced when a subscription is added using a management interface, such as CLI or SEMP.
     */
    maxSubscriptionCount?: number;
    /**
     * The maximum number of transacted sessions that can be created by one client using the Client Profile.
     */
    maxTransactedSessionCount?: number;
    /**
     * The maximum number of transactions that can be created by one client using the Client Profile.
     */
    maxTransactionCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The maximum depth of the "Control 1" (C-1) priority queue, in work units. Each work unit is 2048 bytes of message data.
     */
    queueControl1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Control 1" (C-1) priority queue, regardless of the `queueControl1MaxDepth` value.
     */
    queueControl1MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 1" (D-1) priority queue, in work units. Each work unit is 2048 bytes of message data.
     */
    queueDirect1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 1" (D-1) priority queue, regardless of the `queueDirect1MaxDepth` value.
     */
    queueDirect1MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 2" (D-2) priority queue, in work units. Each work unit is 2048 bytes of message data.
     */
    queueDirect2MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 2" (D-2) priority queue, regardless of the `queueDirect2MaxDepth` value.
     */
    queueDirect2MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 3" (D-3) priority queue, in work units. Each work unit is 2048 bytes of message data.
     */
    queueDirect3MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 3" (D-3) priority queue, regardless of the `queueDirect3MaxDepth` value.
     */
    queueDirect3MinMsgBurst?: number;
    /**
     * The maximum depth of the "Guaranteed 1" (G-1) priority queue, in work units. Each work unit is 2048 bytes of message data.
     */
    queueGuaranteed1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Guaranteed 1" (G-3) priority queue, regardless of the `queueGuaranteed1MaxDepth` value.
     */
    queueGuaranteed1MinMsgBurst?: number;
    /**
     * Indicates whether to send a negative acknowledgement (NACK) to a client using the Client Profile when discarding a guaranteed message due to no matching subscription found.
     */
    rejectMsgToSenderOnNoSubscriptionMatchEnabled?: boolean;
    /**
     * Indicates whether clients using the Client Profile are allowed to connect to the Message VPN when its replication state is standby.
     */
    replicationAllowClientConnectWhenStandbyEnabled?: boolean;
    /**
     * The minimum client keepalive timeout which will be enforced for client connections. Available since 2.19.
     */
    serviceMinKeepaliveTimeout?: number;
    /**
     * The maximum number of SMF client connections per Client Username using the Client Profile.
     */
    serviceSmfMaxConnectionCountPerClientUsername?: number;
    /**
     * Enable or disable the enforcement of a minimum keepalive timeout for SMF clients. Available since 2.19.
     */
    serviceSmfMinKeepaliveEnabled?: boolean;
    /**
     * The timeout for inactive Web Transport client sessions using the Client Profile, in seconds.
     */
    serviceWebInactiveTimeout?: number;
    /**
     * The maximum number of Web Transport client connections per Client Username using the Client Profile.
     */
    serviceWebMaxConnectionCountPerClientUsername?: number;
    /**
     * The maximum Web Transport payload size before fragmentation occurs for clients using the Client Profile, in bytes. The size of the header is not included.
     */
    serviceWebMaxPayload?: number;
    /**
     * The TCP initial congestion window size for clients using the Client Profile, in multiples of the TCP Maximum Segment Size (MSS). Changing the value from its default of 2 results in non-compliance with RFC 2581. Contact Solace Support before changing this value.
     */
    tcpCongestionWindowSize?: number;
    /**
     * The number of TCP keepalive retransmissions to a client using the Client Profile before declaring that it is not available.
     */
    tcpKeepaliveCount?: number;
    /**
     * The amount of time a client connection using the Client Profile must remain idle before TCP begins sending keepalive probes, in seconds.
     */
    tcpKeepaliveIdleTime?: number;
    /**
     * The amount of time between TCP keepalive retransmissions to a client using the Client Profile when no acknowledgement is received, in seconds.
     */
    tcpKeepaliveInterval?: number;
    /**
     * The TCP maximum segment size for clients using the Client Profile, in bytes. Changes are applied to all existing connections.
     */
    tcpMaxSegmentSize?: number;
    /**
     * The TCP maximum window size for clients using the Client Profile, in kilobytes. Changes are applied to all existing connections.
     */
    tcpMaxWindowSize?: number;
    /**
     * Indicates whether clients using the Client Profile are allowed to downgrade an encrypted connection to plain text.
     */
    tlsAllowDowngradeToPlainTextEnabled?: boolean;
}

export namespace MsgVpnClientProfile {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientProfile';

    /**
     * Indicates whether clients using the Client Profile are allowed to create durable and/or non-durable topic endponts or queues. The allowed values and their meaning are:
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
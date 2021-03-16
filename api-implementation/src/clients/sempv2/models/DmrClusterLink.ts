/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventThreshold } from './EventThreshold';

export type DmrClusterLink = {
    /**
     * The password used to authenticate with the remote node when using basic internal authentication. If this per-Link password is not configured, the Cluster's password is used instead. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default value is `""`.
     */
    authenticationBasicPassword?: string;
    /**
     * The authentication scheme to be used by the Link which initiates connections to the remote node. The default value is `"basic"`. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    authenticationScheme?: DmrClusterLink.authenticationScheme;
    /**
     * The maximum depth of the "Control 1" (C-1) priority queue, in work units. Each work unit is 2048 bytes of message data. The default value is `20000`.
     */
    clientProfileQueueControl1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Control 1" (C-1) priority queue, regardless of the `clientProfileQueueControl1MaxDepth` value. The default value is `4`.
     */
    clientProfileQueueControl1MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 1" (D-1) priority queue, in work units. Each work unit is 2048 bytes of message data. The default value is `20000`.
     */
    clientProfileQueueDirect1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 1" (D-1) priority queue, regardless of the `clientProfileQueueDirect1MaxDepth` value. The default value is `4`.
     */
    clientProfileQueueDirect1MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 2" (D-2) priority queue, in work units. Each work unit is 2048 bytes of message data. The default value is `20000`.
     */
    clientProfileQueueDirect2MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 2" (D-2) priority queue, regardless of the `clientProfileQueueDirect2MaxDepth` value. The default value is `4`.
     */
    clientProfileQueueDirect2MinMsgBurst?: number;
    /**
     * The maximum depth of the "Direct 3" (D-3) priority queue, in work units. Each work unit is 2048 bytes of message data. The default value is `20000`.
     */
    clientProfileQueueDirect3MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Direct 3" (D-3) priority queue, regardless of the `clientProfileQueueDirect3MaxDepth` value. The default value is `4`.
     */
    clientProfileQueueDirect3MinMsgBurst?: number;
    /**
     * The maximum depth of the "Guaranteed 1" (G-1) priority queue, in work units. Each work unit is 2048 bytes of message data. The default value is `20000`.
     */
    clientProfileQueueGuaranteed1MaxDepth?: number;
    /**
     * The number of messages that are always allowed entry into the "Guaranteed 1" (G-3) priority queue, regardless of the `clientProfileQueueGuaranteed1MaxDepth` value. The default value is `255`.
     */
    clientProfileQueueGuaranteed1MinMsgBurst?: number;
    /**
     * The TCP initial congestion window size, in multiples of the TCP Maximum Segment Size (MSS). Changing the value from its default of 2 results in non-compliance with RFC 2581. Contact Solace Support before changing this value. The default value is `2`.
     */
    clientProfileTcpCongestionWindowSize?: number;
    /**
     * The number of TCP keepalive retransmissions to be carried out before declaring that the remote end is not available. The default value is `5`.
     */
    clientProfileTcpKeepaliveCount?: number;
    /**
     * The amount of time a connection must remain idle before TCP begins sending keepalive probes, in seconds. The default value is `3`.
     */
    clientProfileTcpKeepaliveIdleTime?: number;
    /**
     * The amount of time between TCP keepalive retransmissions when no acknowledgement is received, in seconds. The default value is `1`.
     */
    clientProfileTcpKeepaliveInterval?: number;
    /**
     * The TCP maximum segment size, in bytes. Changes are applied to all existing connections. The default value is `1460`.
     */
    clientProfileTcpMaxSegmentSize?: number;
    /**
     * The TCP maximum window size, in kilobytes. Changes are applied to all existing connections. The default value is `256`.
     */
    clientProfileTcpMaxWindowSize?: number;
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * The number of outstanding guaranteed messages that can be sent over the Link before acknowledgement is received by the sender. The default value is `255`.
     */
    egressFlowWindowSize?: number;
    /**
     * Enable or disable the Link. When disabled, subscription sets of this and the remote node are not kept up-to-date, and messages are not exchanged with the remote node. Published guaranteed messages will be queued up for future delivery based on current subscription sets. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The initiator of the Link's TCP connections. The default value is `"lexical"`. The allowed values and their meaning are:
     *
     * <pre>
     * "lexical" - The "higher" node-name initiates.
     * "local" - The local node initiates.
     * "remote" - The remote node initiates.
     * </pre>
     *
     */
    initiator?: DmrClusterLink.initiator;
    /**
     * The name of the Dead Message Queue (DMQ) used by the Queue for discarded messages. The default value is `"#DEAD_MSG_QUEUE"`.
     */
    queueDeadMsgQueue?: string;
    queueEventSpoolUsageThreshold?: EventThreshold;
    /**
     * The maximum number of messages delivered but not acknowledged per flow for the Queue. The default value is `1000000`.
     */
    queueMaxDeliveredUnackedMsgsPerFlow?: number;
    /**
     * The maximum message spool usage by the Queue (quota), in megabytes (MB). The default varies by platform.
     */
    queueMaxMsgSpoolUsage?: number;
    /**
     * The maximum number of times the Queue will attempt redelivery of a message prior to it being discarded or moved to the DMQ. A value of 0 means to retry forever. The default value is `0`.
     */
    queueMaxRedeliveryCount?: number;
    /**
     * The maximum time in seconds a message can stay in the Queue when `queueRespectTtlEnabled` is `true`. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the `queueMaxTtl` configured for the Queue, is exceeded. A value of 0 disables expiry. The default value is `0`.
     */
    queueMaxTtl?: number;
    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The default value is `"always"`. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     *
     */
    queueRejectMsgToSenderOnDiscardBehavior?: DmrClusterLink.queueRejectMsgToSenderOnDiscardBehavior;
    /**
     * Enable or disable the respecting of the time-to-live (TTL) for messages in the Queue. When enabled, expired messages are discarded or moved to the DMQ. The default value is `false`.
     */
    queueRespectTtlEnabled?: boolean;
    /**
     * The name of the node at the remote end of the Link.
     */
    remoteNodeName?: string;
    /**
     * The span of the Link, either internal or external. Internal Links connect nodes within the same Cluster. External Links connect nodes within different Clusters. The default value is `"external"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Link to same cluster.
     * "external" - Link to other cluster.
     * </pre>
     *
     */
    span?: DmrClusterLink.span;
    /**
     * Enable or disable compression on the Link. The default value is `false`.
     */
    transportCompressedEnabled?: boolean;
    /**
     * Enable or disable encryption (TLS) on the Link. The default value is `false`.
     */
    transportTlsEnabled?: boolean;
}

export namespace DmrClusterLink {

    /**
     * The authentication scheme to be used by the Link which initiates connections to the remote node. The default value is `"basic"`. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    export enum authenticationScheme {
        BASIC = 'basic',
        CLIENT_CERTIFICATE = 'client-certificate',
    }

    /**
     * The initiator of the Link's TCP connections. The default value is `"lexical"`. The allowed values and their meaning are:
     *
     * <pre>
     * "lexical" - The "higher" node-name initiates.
     * "local" - The local node initiates.
     * "remote" - The remote node initiates.
     * </pre>
     *
     */
    export enum initiator {
        LEXICAL = 'lexical',
        LOCAL = 'local',
        REMOTE = 'remote',
    }

    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The default value is `"always"`. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     *
     */
    export enum queueRejectMsgToSenderOnDiscardBehavior {
        ALWAYS = 'always',
        WHEN_QUEUE_ENABLED = 'when-queue-enabled',
        NEVER = 'never',
    }

    /**
     * The span of the Link, either internal or external. Internal Links connect nodes within the same Cluster. External Links connect nodes within different Clusters. The default value is `"external"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Link to same cluster.
     * "external" - Link to other cluster.
     * </pre>
     *
     */
    export enum span {
        INTERNAL = 'internal',
        EXTERNAL = 'external',
    }


}

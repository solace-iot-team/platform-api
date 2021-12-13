/* eslint-disable */


import type { EventThreshold } from './EventThreshold';

export type MsgVpnQueue = {
    /**
     * The access type for delivering messages to consumer flows bound to the Queue. The allowed values and their meaning are:
     *
     * <pre>
     * "exclusive" - Exclusive delivery of messages to the first bound consumer flow.
     * "non-exclusive" - Non-exclusive delivery of messages to all bound consumer flows in a round-robin fashion.
     * </pre>
     *
     */
    accessType?: MsgVpnQueue.accessType;
    /**
     * The number of Queue bind failures due to being already bound.
     */
    alreadyBoundBindFailureCount?: number;
    /**
     * The one minute average of the message rate received by the Queue, in bytes per second (B/sec).
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the message rate received by the Queue, in messages per second (msg/sec).
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Queue, in bytes per second (B/sec).
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the message rate transmitted by the Queue, in messages per second (msg/sec).
     */
    averageTxMsgRate?: number;
    /**
     * The number of consumer requests to bind to the Queue.
     */
    bindRequestCount?: number;
    /**
     * The number of successful consumer requests to bind to the Queue.
     */
    bindSuccessCount?: number;
    /**
     * The forwarding mode of the Queue at bind time. The allowed values and their meaning are:
     *
     * <pre>
     * "store-and-forward" - Deliver messages using the guaranteed data path.
     * "cut-through" - Deliver messages using the direct and guaranteed data paths for lower latency.
     * </pre>
     *
     */
    bindTimeForwardingMode?: string;
    /**
     * The number of guaranteed messages discarded by the Queue due to being denied by the Client Profile.
     */
    clientProfileDeniedDiscardedMsgCount?: number;
    /**
     * Indicates whether the propagation of consumer acknowledgements (ACKs) received on the active replication Message VPN to the standby replication Message VPN is enabled.
     */
    consumerAckPropagationEnabled?: boolean;
    /**
     * Indicates whether the Queue was created by a management API (CLI or SEMP).
     */
    createdByManagement?: boolean;
    /**
     * The name of the Dead Message Queue (DMQ) used by the Queue.
     */
    deadMsgQueue?: string;
    /**
     * The number of guaranteed messages deleted from the Queue.
     */
    deletedMsgCount?: number;
    /**
     * Enable or disable the ability for client applications to query the message delivery count of messages received from the Queue. This is a controlled availability feature. Please contact Solace to find out if this feature is supported for your use case. Available since 2.19.
     */
    deliveryCountEnabled?: boolean;
    /**
     * The delay, in seconds, to apply to messages arriving on the Queue before the messages are eligible for delivery. Available since 2.22.
     */
    deliveryDelay?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to a destination group error.
     */
    destinationGroupErrorDiscardedMsgCount?: number;
    /**
     * The number of Queue bind failures due to being disabled.
     */
    disabledBindFailureCount?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to it being disabled.
     */
    disabledDiscardedMsgCount?: number;
    /**
     * Indicates whether the Queue is durable and not temporary.
     */
    durable?: boolean;
    /**
     * Indicates whether the transmission of messages from the Queue is enabled.
     */
    egressEnabled?: boolean;
    eventBindCountThreshold?: EventThreshold;
    eventMsgSpoolUsageThreshold?: EventThreshold;
    eventRejectLowPriorityMsgLimitThreshold?: EventThreshold;
    /**
     * The highest identifier (ID) of guaranteed messages in the Queue that were acknowledged.
     */
    highestAckedMsgId?: number;
    /**
     * The highest identifier (ID) of guaranteed messages in the Queue.
     */
    highestMsgId?: number;
    /**
     * The number of acknowledgement messages received by the Queue that are in the process of updating and deleting associated guaranteed messages.
     */
    inProgressAckMsgCount?: number;
    /**
     * Indicates whether the reception of messages to the Queue is enabled.
     */
    ingressEnabled?: boolean;
    /**
     * The number of Queue bind failures due to an invalid selector.
     */
    invalidSelectorBindFailureCount?: number;
    /**
     * The timestamp of the last completed replay for the Queue. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastReplayCompleteTime?: number;
    /**
     * The reason for the last replay failure for the Queue.
     */
    lastReplayFailureReason?: string;
    /**
     * The timestamp of the last replay failure for the Queue. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastReplayFailureTime?: number;
    /**
     * The timestamp of the last replay started for the Queue. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastReplayStartTime?: number;
    /**
     * The timestamp of the last replayed message transmitted by the Queue. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastReplayedMsgTxTime?: number;
    /**
     * The identifier (ID) of the last guaranteed message spooled in the Queue.
     */
    lastSpooledMsgId?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to low priority message congestion control.
     */
    lowPriorityMsgCongestionDiscardedMsgCount?: number;
    /**
     * The state of the low priority message congestion in the Queue. The allowed values and their meaning are:
     *
     * <pre>
     * "disabled" - Messages are not being checked for priority.
     * "not-congested" - Low priority messages are being stored and delivered.
     * "congested" - Low priority messages are being discarded.
     * </pre>
     *
     */
    lowPriorityMsgCongestionState?: string;
    /**
     * The lowest identifier (ID) of guaranteed messages in the Queue that were acknowledged.
     */
    lowestAckedMsgId?: number;
    /**
     * The lowest identifier (ID) of guaranteed messages in the Queue.
     */
    lowestMsgId?: number;
    /**
     * The maximum number of consumer flows that can bind to the Queue.
     */
    maxBindCount?: number;
    /**
     * The number of Queue bind failures due to the maximum bind count being exceeded.
     */
    maxBindCountExceededBindFailureCount?: number;
    /**
     * The maximum number of messages delivered but not acknowledged per flow for the Queue.
     */
    maxDeliveredUnackedMsgsPerFlow?: number;
    /**
     * The maximum message size allowed in the Queue, in bytes (B).
     */
    maxMsgSize?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum message size being exceeded.
     */
    maxMsgSizeExceededDiscardedMsgCount?: number;
    /**
     * The maximum message spool usage allowed by the Queue, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking.
     */
    maxMsgSpoolUsage?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum message spool usage being exceeded.
     */
    maxMsgSpoolUsageExceededDiscardedMsgCount?: number;
    /**
     * The maximum number of times the Queue will attempt redelivery of a message prior to it being discarded or moved to the DMQ. A value of 0 means to retry forever.
     */
    maxRedeliveryCount?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum redelivery attempts being exceeded.
     */
    maxRedeliveryExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum redelivery attempts being exceeded and failing to move to the Dead Message Queue (DMQ).
     */
    maxRedeliveryExceededToDmqFailedMsgCount?: number;
    /**
     * The number of guaranteed messages moved to the Dead Message Queue (DMQ) by the Queue due to the maximum redelivery attempts being exceeded.
     */
    maxRedeliveryExceededToDmqMsgCount?: number;
    /**
     * The maximum time in seconds a message can stay in the Queue when `respectTtlEnabled` is `"true"`. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the `maxTtl` configured for the Queue, is exceeded. A value of 0 disables expiry.
     */
    maxTtl?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum time-to-live (TTL) in hops being exceeded. The TTL hop count is incremented when the message crosses a bridge.
     */
    maxTtlExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum time-to-live (TTL) timestamp expiring.
     */
    maxTtlExpiredDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages discarded by the Queue due to the maximum time-to-live (TTL) timestamp expiring and failing to move to the Dead Message Queue (DMQ).
     */
    maxTtlExpiredToDmqFailedMsgCount?: number;
    /**
     * The number of guaranteed messages moved to the Dead Message Queue (DMQ) by the Queue due to the maximum time-to-live (TTL) timestamp expiring.
     */
    maxTtlExpiredToDmqMsgCount?: number;
    /**
     * The message spool peak usage by the Queue, in bytes (B).
     */
    msgSpoolPeakUsage?: number;
    /**
     * The message spool usage by the Queue, in bytes (B).
     */
    msgSpoolUsage?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the network topic for the Queue.
     */
    networkTopic?: string;
    /**
     * The number of guaranteed messages discarded by the Queue due to no local delivery being requested.
     */
    noLocalDeliveryDiscardedMsgCount?: number;
    /**
     * The number of Queue bind failures due to other reasons.
     */
    otherBindFailureCount?: number;
    /**
     * The Client Username that owns the Queue and has permission equivalent to `"delete"`.
     */
    owner?: string;
    /**
     * The permission level for all consumers of the Queue, excluding the owner. The allowed values and their meaning are:
     *
     * <pre>
     * "no-access" - Disallows all access.
     * "read-only" - Read-only access to the messages.
     * "consume" - Consume (read and remove) messages.
     * "modify-topic" - Consume messages or modify the topic/selector.
     * "delete" - Consume messages, modify the topic/selector or delete the Client created endpoint altogether.
     * </pre>
     *
     */
    permission?: MsgVpnQueue.permission;
    /**
     * The name of the Queue.
     */
    queueName?: string;
    /**
     * The number of guaranteed messages transmitted by the Queue for redelivery.
     */
    redeliveredMsgCount?: number;
    /**
     * Enable or disable message redelivery. When enabled, the number of redelivery attempts is controlled by maxRedeliveryCount. When disabled, the message will never be delivered from the queue more than once. Available since 2.18.
     */
    redeliveryEnabled?: boolean;
    /**
     * Indicates whether the checking of low priority messages against the `rejectLowPriorityMsgLimit` is enabled.
     */
    rejectLowPriorityMsgEnabled?: boolean;
    /**
     * The number of messages of any priority in the Queue above which low priority messages are not admitted but higher priority messages are allowed.
     */
    rejectLowPriorityMsgLimit?: number;
    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     *
     */
    rejectMsgToSenderOnDiscardBehavior?: MsgVpnQueue.rejectMsgToSenderOnDiscardBehavior;
    /**
     * The number of replays that failed for the Queue.
     */
    replayFailureCount?: number;
    /**
     * The number of replays started for the Queue.
     */
    replayStartCount?: number;
    /**
     * The state of replay for the Queue. The allowed values and their meaning are:
     *
     * <pre>
     * "initializing" - All messages are being deleted from the endpoint before replay starts.
     * "active" - Subscription matching logged messages are being replayed to the endpoint.
     * "pending-complete" - Replay is complete, but final accounting is in progress.
     * "complete" - Replay and all related activities are complete.
     * "failed" - Replay has failed and is waiting for an unbind response.
     * </pre>
     *
     */
    replayState?: string;
    /**
     * The number of replays that succeeded for the Queue.
     */
    replaySuccessCount?: number;
    /**
     * The number of replayed messages transmitted by the Queue and acked by all consumers.
     */
    replayedAckedMsgCount?: number;
    /**
     * The number of replayed messages transmitted by the Queue.
     */
    replayedTxMsgCount?: number;
    /**
     * The number of acknowledgement messages propagated by the Queue to the replication standby remote Message VPN.
     */
    replicationActiveAckPropTxMsgCount?: number;
    /**
     * The number of propagated acknowledgement messages received by the Queue from the replication active remote Message VPN.
     */
    replicationStandbyAckPropRxMsgCount?: number;
    /**
     * The number of messages acknowledged in the Queue by acknowledgement propagation from the replication active remote Message VPN.
     */
    replicationStandbyAckedByAckPropMsgCount?: number;
    /**
     * The number of messages received by the Queue from the replication active remote Message VPN.
     */
    replicationStandbyRxMsgCount?: number;
    /**
     * Indicates whether message priorities are respected. When enabled, messages contained in the Queue are delivered in priority order, from 9 (highest) to 0 (lowest).
     */
    respectMsgPriorityEnabled?: boolean;
    /**
     * Indicates whether the the time-to-live (TTL) for messages in the Queue is respected. When enabled, expired messages are discarded or moved to the DMQ.
     */
    respectTtlEnabled?: boolean;
    /**
     * The current message rate received by the Queue, in bytes per second (B/sec).
     */
    rxByteRate?: number;
    /**
     * The current message rate received by the Queue, in messages per second (msg/sec).
     */
    rxMsgRate?: number;
    /**
     * The amount of guaranteed messages that were spooled in the Queue, in bytes (B).
     */
    spooledByteCount?: number;
    /**
     * The number of guaranteed messages that were spooled in the Queue.
     */
    spooledMsgCount?: number;
    /**
     * The number of guaranteed messages that were retransmitted by the Queue at the transport layer as part of a single delivery attempt. Available since 2.18.
     */
    transportRetransmitMsgCount?: number;
    /**
     * The current message rate transmitted by the Queue, in bytes per second (B/sec).
     */
    txByteRate?: number;
    /**
     * The current message rate transmitted by the Queue, in messages per second (msg/sec).
     */
    txMsgRate?: number;
    /**
     * Indicates whether the Queue has consumers with selectors to filter transmitted messages.
     */
    txSelector?: boolean;
    /**
     * The number of guaranteed messages in the Queue that have been transmitted but not acknowledged by all consumers.
     */
    txUnackedMsgCount?: number;
    /**
     * The virtual router of the Queue. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The endpoint belongs to the primary virtual router.
     * "backup" - The endpoint belongs to the backup virtual router.
     * </pre>
     *
     */
    virtualRouter?: string;
}

export namespace MsgVpnQueue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueue';

    /**
     * The access type for delivering messages to consumer flows bound to the Queue. The allowed values and their meaning are:
     *
     * <pre>
     * "exclusive" - Exclusive delivery of messages to the first bound consumer flow.
     * "non-exclusive" - Non-exclusive delivery of messages to all bound consumer flows in a round-robin fashion.
     * </pre>
     *
     */
    export enum accessType {
        EXCLUSIVE = 'exclusive',
        NON_EXCLUSIVE = 'non-exclusive',
    }

    /**
     * The permission level for all consumers of the Queue, excluding the owner. The allowed values and their meaning are:
     *
     * <pre>
     * "no-access" - Disallows all access.
     * "read-only" - Read-only access to the messages.
     * "consume" - Consume (read and remove) messages.
     * "modify-topic" - Consume messages or modify the topic/selector.
     * "delete" - Consume messages, modify the topic/selector or delete the Client created endpoint altogether.
     * </pre>
     *
     */
    export enum permission {
        NO_ACCESS = 'no-access',
        READ_ONLY = 'read-only',
        CONSUME = 'consume',
        MODIFY_TOPIC = 'modify-topic',
        DELETE = 'delete',
    }

    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     *
     */
    export enum rejectMsgToSenderOnDiscardBehavior {
        ALWAYS = 'always',
        WHEN_QUEUE_ENABLED = 'when-queue-enabled',
        NEVER = 'never',
    }


}
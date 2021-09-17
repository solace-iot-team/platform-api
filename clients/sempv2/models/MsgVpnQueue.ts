/* eslint-disable */


import type { EventThreshold } from './EventThreshold';

export type MsgVpnQueue = {
    /**
     * The access type for delivering messages to consumer flows bound to the Queue. The default value is `"exclusive"`. The allowed values and their meaning are:
     *
     * <pre>
     * "exclusive" - Exclusive delivery of messages to the first bound consumer flow.
     * "non-exclusive" - Non-exclusive delivery of messages to all bound consumer flows in a round-robin fashion.
     * </pre>
     *
     */
    accessType?: MsgVpnQueue.accessType;
    /**
     * Enable or disable the propagation of consumer acknowledgements (ACKs) received on the active replication Message VPN to the standby replication Message VPN. The default value is `true`.
     */
    consumerAckPropagationEnabled?: boolean;
    /**
     * The name of the Dead Message Queue (DMQ) used by the Queue. The default value is `"#DEAD_MSG_QUEUE"`. Available since 2.2.
     */
    deadMsgQueue?: string;
    /**
     * Enable or disable the ability for client applications to query the message delivery count of messages received from the Queue. This is a controlled availability feature. Please contact Solace to find out if this feature is supported for your use case. The default value is `false`. Available since 2.19.
     */
    deliveryCountEnabled?: boolean;
    /**
     * Enable or disable the transmission of messages from the Queue. The default value is `false`.
     */
    egressEnabled?: boolean;
    eventBindCountThreshold?: EventThreshold;
    eventMsgSpoolUsageThreshold?: EventThreshold;
    eventRejectLowPriorityMsgLimitThreshold?: EventThreshold;
    /**
     * Enable or disable the reception of messages to the Queue. The default value is `false`.
     */
    ingressEnabled?: boolean;
    /**
     * The maximum number of consumer flows that can bind to the Queue. The default value is `1000`.
     */
    maxBindCount?: number;
    /**
     * The maximum number of messages delivered but not acknowledged per flow for the Queue. The default value is `10000`.
     */
    maxDeliveredUnackedMsgsPerFlow?: number;
    /**
     * The maximum message size allowed in the Queue, in bytes (B). The default value is `10000000`.
     */
    maxMsgSize?: number;
    /**
     * The maximum message spool usage allowed by the Queue, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking. The default value is `1500`.
     */
    maxMsgSpoolUsage?: number;
    /**
     * The maximum number of times the Queue will attempt redelivery of a message prior to it being discarded or moved to the DMQ. A value of 0 means to retry forever. The default value is `0`.
     */
    maxRedeliveryCount?: number;
    /**
     * The maximum time in seconds a message can stay in the Queue when `respectTtlEnabled` is `"true"`. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the `maxTtl` configured for the Queue, is exceeded. A value of 0 disables expiry. The default value is `0`.
     */
    maxTtl?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The Client Username that owns the Queue and has permission equivalent to `"delete"`. The default value is `""`.
     */
    owner?: string;
    /**
     * The permission level for all consumers of the Queue, excluding the owner. The default value is `"no-access"`. The allowed values and their meaning are:
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
     * Enable or disable message redelivery. When enabled, the number of redelivery attempts is controlled by maxRedeliveryCount. When disabled, the message will never be delivered from the queue more than once. The default value is `true`. Available since 2.18.
     */
    redeliveryEnabled?: boolean;
    /**
     * Enable or disable the checking of low priority messages against the `rejectLowPriorityMsgLimit`. This may only be enabled if `rejectMsgToSenderOnDiscardBehavior` does not have a value of `"never"`. The default value is `false`.
     */
    rejectLowPriorityMsgEnabled?: boolean;
    /**
     * The number of messages of any priority in the Queue above which low priority messages are not admitted but higher priority messages are allowed. The default value is `0`.
     */
    rejectLowPriorityMsgLimit?: number;
    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The default value is `"when-queue-enabled"`. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     * Available since 2.1.
     */
    rejectMsgToSenderOnDiscardBehavior?: MsgVpnQueue.rejectMsgToSenderOnDiscardBehavior;
    /**
     * Enable or disable the respecting of message priority. When enabled, messages contained in the Queue are delivered in priority order, from 9 (highest) to 0 (lowest). MQTT queues do not support enabling message priority. The default value is `false`. Available since 2.8.
     */
    respectMsgPriorityEnabled?: boolean;
    /**
     * Enable or disable the respecting of the time-to-live (TTL) for messages in the Queue. When enabled, expired messages are discarded or moved to the DMQ. The default value is `false`.
     */
    respectTtlEnabled?: boolean;
}

export namespace MsgVpnQueue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueue';

    /**
     * The access type for delivering messages to consumer flows bound to the Queue. The default value is `"exclusive"`. The allowed values and their meaning are:
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
     * The permission level for all consumers of the Queue, excluding the owner. The default value is `"no-access"`. The allowed values and their meaning are:
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
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The default value is `"when-queue-enabled"`. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     * Available since 2.1.
     */
    export enum rejectMsgToSenderOnDiscardBehavior {
        ALWAYS = 'always',
        WHEN_QUEUE_ENABLED = 'when-queue-enabled',
        NEVER = 'never',
    }


}
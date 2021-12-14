/* eslint-disable */


import type { EventThreshold } from './EventThreshold';

export type MsgVpnQueueTemplate = {
    /**
     * The access type for delivering messages to consumer flows. The allowed values and their meaning are:
     *
     * <pre>
     * "exclusive" - Exclusive delivery of messages to the first bound consumer flow.
     * "non-exclusive" - Non-exclusive delivery of messages to all bound consumer flows in a round-robin fashion.
     * </pre>
     *
     */
    accessType?: MsgVpnQueueTemplate.accessType;
    /**
     * Indicates whether the propagation of consumer acknowledgements (ACKs) received on the active replication Message VPN to the standby replication Message VPN is enabled.
     */
    consumerAckPropagationEnabled?: boolean;
    /**
     * The name of the Dead Message Queue (DMQ).
     */
    deadMsgQueue?: string;
    /**
     * The delay, in seconds, to apply to messages arriving on the Queue before the messages are eligible for delivery. This attribute does not apply to MQTT queues created from this template, but it may apply in future releases. Therefore, to maintain forward compatibility, do not set this value on templates that might be used for MQTT queues. Available since 2.22.
     */
    deliveryDelay?: number;
    /**
     * Controls the durability of queues created from this template. If non-durable, the created queue will be non-durable, regardless of the specified durability. If none, the created queue will have the requested durability. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - The durability of the endpoint will be as requested on create.
     * "non-durable" - The durability of the created queue will be non-durable, regardless of what was requested.
     * </pre>
     *
     */
    durabilityOverride?: MsgVpnQueueTemplate.durabilityOverride;
    eventBindCountThreshold?: EventThreshold;
    eventMsgSpoolUsageThreshold?: EventThreshold;
    eventRejectLowPriorityMsgLimitThreshold?: EventThreshold;
    /**
     * The maximum number of consumer flows that can bind.
     */
    maxBindCount?: number;
    /**
     * The maximum number of messages delivered but not acknowledged per flow.
     */
    maxDeliveredUnackedMsgsPerFlow?: number;
    /**
     * The maximum message size allowed, in bytes (B).
     */
    maxMsgSize?: number;
    /**
     * The maximum message spool usage allowed, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking.
     */
    maxMsgSpoolUsage?: number;
    /**
     * The maximum number of message redelivery attempts that will occur prior to the message being discarded or moved to the DMQ. A value of 0 means to retry forever.
     */
    maxRedeliveryCount?: number;
    /**
     * The maximum time in seconds a message can stay in a Queue when `respectTtlEnabled` is `"true"`. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the `maxTtl` configured for the Queue, is exceeded. A value of 0 disables expiry.
     */
    maxTtl?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The permission level for all consumers, excluding the owner. The allowed values and their meaning are:
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
    permission?: MsgVpnQueueTemplate.permission;
    /**
     * A wildcardable pattern used to determine which Queues use settings from this Template. Two different wildcards are supported: * and >. Similar to topic filters or subscription patterns, a > matches anything (but only when used at the end), and a * matches zero or more characters but never a slash (/). A > is only a wildcard when used at the end, after a /. A * is only allowed at the end, after a slash (/).
     */
    queueNameFilter?: string;
    /**
     * The name of the Queue Template.
     */
    queueTemplateName?: string;
    /**
     * Enable or disable message redelivery. When enabled, the number of redelivery attempts is controlled by maxRedeliveryCount. When disabled, the message will never be delivered from the queue more than once. Available since 2.18.
     */
    redeliveryEnabled?: boolean;
    /**
     * Indicates whether the checking of low priority messages against the `rejectLowPriorityMsgLimit` is enabled.
     */
    rejectLowPriorityMsgEnabled?: boolean;
    /**
     * The number of messages of any priority above which low priority messages are not admitted but higher priority messages are allowed.
     */
    rejectLowPriorityMsgLimit?: number;
    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs prevent the message from being delivered to any destination and Transacted Session commits to fail. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     *
     */
    rejectMsgToSenderOnDiscardBehavior?: MsgVpnQueueTemplate.rejectMsgToSenderOnDiscardBehavior;
    /**
     * Indicates whether message priorities are respected. When enabled, messages are delivered in priority order, from 9 (highest) to 0 (lowest).
     */
    respectMsgPriorityEnabled?: boolean;
    /**
     * Indicates whether the the time-to-live (TTL) for messages is respected. When enabled, expired messages are discarded or moved to the DMQ.
     */
    respectTtlEnabled?: boolean;
}

export namespace MsgVpnQueueTemplate {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueTemplate';

    /**
     * The access type for delivering messages to consumer flows. The allowed values and their meaning are:
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
     * Controls the durability of queues created from this template. If non-durable, the created queue will be non-durable, regardless of the specified durability. If none, the created queue will have the requested durability. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - The durability of the endpoint will be as requested on create.
     * "non-durable" - The durability of the created queue will be non-durable, regardless of what was requested.
     * </pre>
     *
     */
    export enum durabilityOverride {
        NONE = 'none',
        NON_DURABLE = 'non-durable',
    }

    /**
     * The permission level for all consumers, excluding the owner. The allowed values and their meaning are:
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
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs prevent the message from being delivered to any destination and Transacted Session commits to fail. The allowed values and their meaning are:
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
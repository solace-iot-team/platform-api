/* eslint-disable */


import type { EventThreshold } from './EventThreshold';

export type MsgVpnMqttSession = {
    /**
     * Enable or disable the MQTT Session. When disabled, the client is disconnected, new messages matching QoS 0 subscriptions are discarded, and new messages matching QoS 1 subscriptions are stored for future delivery. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The Client ID of the MQTT Session, which corresponds to the ClientId provided in the MQTT CONNECT packet.
     */
    mqttSessionClientId?: string;
    /**
     * The virtual router of the MQTT Session. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The MQTT Session belongs to the primary virtual router.
     * "backup" - The MQTT Session belongs to the backup virtual router.
     * </pre>
     *
     */
    mqttSessionVirtualRouter?: MsgVpnMqttSession.mqttSessionVirtualRouter;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The owner of the MQTT Session. For externally-created sessions this defaults to the Client Username of the connecting client. For management-created sessions this defaults to empty. The default value is `""`.
     */
    owner?: string;
    /**
     * Enable or disable the propagation of consumer acknowledgements (ACKs) received on the active replication Message VPN to the standby replication Message VPN. The default value is `true`. Available since 2.14.
     */
    queueConsumerAckPropagationEnabled?: boolean;
    /**
     * The name of the Dead Message Queue (DMQ) used by the MQTT Session Queue. The default value is `"#DEAD_MSG_QUEUE"`. Available since 2.14.
     */
    queueDeadMsgQueue?: string;
    queueEventBindCountThreshold?: EventThreshold;
    queueEventMsgSpoolUsageThreshold?: EventThreshold;
    queueEventRejectLowPriorityMsgLimitThreshold?: EventThreshold;
    /**
     * The maximum number of consumer flows that can bind to the MQTT Session Queue. The default value is `1000`. Available since 2.14.
     */
    queueMaxBindCount?: number;
    /**
     * The maximum number of messages delivered but not acknowledged per flow for the MQTT Session Queue. The default value is `10000`. Available since 2.14.
     */
    queueMaxDeliveredUnackedMsgsPerFlow?: number;
    /**
     * The maximum message size allowed in the MQTT Session Queue, in bytes (B). The default value is `10000000`. Available since 2.14.
     */
    queueMaxMsgSize?: number;
    /**
     * The maximum message spool usage allowed by the MQTT Session Queue, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking. The default value is `1500`. Available since 2.14.
     */
    queueMaxMsgSpoolUsage?: number;
    /**
     * The maximum number of times the MQTT Session Queue will attempt redelivery of a message prior to it being discarded or moved to the DMQ. A value of 0 means to retry forever. The default value is `0`. Available since 2.14.
     */
    queueMaxRedeliveryCount?: number;
    /**
     * The maximum time in seconds a message can stay in the MQTT Session Queue when `queueRespectTtlEnabled` is `"true"`. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the `queueMaxTtl` configured for the MQTT Session Queue, is exceeded. A value of 0 disables expiry. The default value is `0`. Available since 2.14.
     */
    queueMaxTtl?: number;
    /**
     * Enable or disable the checking of low priority messages against the `queueRejectLowPriorityMsgLimit`. This may only be enabled if `queueRejectMsgToSenderOnDiscardBehavior` does not have a value of `"never"`. The default value is `false`. Available since 2.14.
     */
    queueRejectLowPriorityMsgEnabled?: boolean;
    /**
     * The number of messages of any priority in the MQTT Session Queue above which low priority messages are not admitted but higher priority messages are allowed. The default value is `0`. Available since 2.14.
     */
    queueRejectLowPriorityMsgLimit?: number;
    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The default value is `"when-queue-enabled"`. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     * Available since 2.14.
     */
    queueRejectMsgToSenderOnDiscardBehavior?: MsgVpnMqttSession.queueRejectMsgToSenderOnDiscardBehavior;
    /**
     * Enable or disable the respecting of the time-to-live (TTL) for messages in the MQTT Session Queue. When enabled, expired messages are discarded or moved to the DMQ. The default value is `false`. Available since 2.14.
     */
    queueRespectTtlEnabled?: boolean;
}

export namespace MsgVpnMqttSession {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSession';

    /**
     * The virtual router of the MQTT Session. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The MQTT Session belongs to the primary virtual router.
     * "backup" - The MQTT Session belongs to the backup virtual router.
     * </pre>
     *
     */
    export enum mqttSessionVirtualRouter {
        PRIMARY = 'primary',
        BACKUP = 'backup',
    }

    /**
     * Determines when to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The default value is `"when-queue-enabled"`. The allowed values and their meaning are:
     *
     * <pre>
     * "always" - Always return a negative acknowledgment (NACK) to the sending client on message discard.
     * "when-queue-enabled" - Only return a negative acknowledgment (NACK) to the sending client on message discard when the Queue is enabled.
     * "never" - Never return a negative acknowledgment (NACK) to the sending client on message discard.
     * </pre>
     * Available since 2.14.
     */
    export enum queueRejectMsgToSenderOnDiscardBehavior {
        ALWAYS = 'always',
        WHEN_QUEUE_ENABLED = 'when-queue-enabled',
        NEVER = 'never',
    }


}
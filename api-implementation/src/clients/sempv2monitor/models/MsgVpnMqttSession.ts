/* eslint-disable */


import type { EventThreshold } from './EventThreshold';
import type { MsgVpnMqttSessionCounter } from './MsgVpnMqttSessionCounter';

export type MsgVpnMqttSession = {
    /**
     * Indicates whether the Client requested a clean (newly created) MQTT Session when connecting. If not clean (already existing), then previously stored messages for QoS 1 subscriptions are delivered.
     */
    clean?: boolean;
    /**
     * The name of the MQTT Session Client.
     */
    clientName?: string;
    counter?: MsgVpnMqttSessionCounter;
    /**
     * Indicates whether the MQTT Session was created by a Management API.
     */
    createdByManagement?: boolean;
    /**
     * Indicates whether the MQTT Session is durable. Disconnected durable MQTT Sessions are deleted when their expiry time is reached. Disconnected non-durable MQTT Sessions are deleted immediately. Available since 2.21.
     */
    durable?: boolean;
    /**
     * Indicates whether the MQTT Session is enabled.
     */
    enabled?: boolean;
    /**
     * The timestamp of when the disconnected MQTT session expires and is deleted. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). A value of 0 indicates that the session is either connected, or will never expire. Available since 2.21.
     */
    expiryTime?: number;
    /**
     * The maximum size of a packet, including all headers and payload, that the Client has signaled it is willing to accept. A value of zero indicates no limit. Note that there are other broker settings which may further limit packet size. Available since 2.21.
     */
    maxPacketSize?: number;
    /**
     * The number of MQTT connect acknowledgment (CONNACK) refused response packets transmitted to the Client. Available since 2.13.
     */
    mqttConnackErrorTxCount?: number;
    /**
     * The number of MQTT connect acknowledgment (CONNACK) accepted response packets transmitted to the Client. Available since 2.13.
     */
    mqttConnackTxCount?: number;
    /**
     * The number of MQTT connect (CONNECT) request packets received from the Client. Available since 2.13.
     */
    mqttConnectRxCount?: number;
    /**
     * The number of MQTT disconnect (DISCONNECT) request packets received from the Client. Available since 2.13.
     */
    mqttDisconnectRxCount?: number;
    /**
     * The number of MQTT publish complete (PUBCOMP) packets transmitted to the Client in response to a PUBREL packet. These packets are the fourth and final packet of a QoS 2 protocol exchange. Available since 2.13.
     */
    mqttPubcompTxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 0 message delivery. Available since 2.13.
     */
    mqttPublishQos0RxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets transmitted to the Client for QoS 0 message delivery. Available since 2.13.
     */
    mqttPublishQos0TxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 1 message delivery. Available since 2.13.
     */
    mqttPublishQos1RxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets transmitted to the Client for QoS 1 message delivery. Available since 2.13.
     */
    mqttPublishQos1TxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 2 message delivery. Available since 2.13.
     */
    mqttPublishQos2RxCount?: number;
    /**
     * The number of MQTT publish received (PUBREC) packets transmitted to the Client in response to a PUBLISH packet with QoS 2. These packets are the second packet of a QoS 2 protocol exchange. Available since 2.13.
     */
    mqttPubrecTxCount?: number;
    /**
     * The number of MQTT publish release (PUBREL) packets received from the Client in response to a PUBREC packet. These packets are the third packet of a QoS 2 protocol exchange. Available since 2.13.
     */
    mqttPubrelRxCount?: number;
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
     * The Client Username which owns the MQTT Session.
     */
    owner?: string;
    /**
     * Indicates whether consumer acknowledgements (ACKs) received on the active replication Message VPN are propagated to the standby replication Message VPN. Available since 2.14.
     */
    queueConsumerAckPropagationEnabled?: boolean;
    /**
     * The name of the Dead Message Queue (DMQ) used by the MQTT Session Queue. Available since 2.14.
     */
    queueDeadMsgQueue?: string;
    queueEventBindCountThreshold?: EventThreshold;
    queueEventMsgSpoolUsageThreshold?: EventThreshold;
    queueEventRejectLowPriorityMsgLimitThreshold?: EventThreshold;
    /**
     * The maximum number of consumer flows that can bind to the MQTT Session Queue. Available since 2.14.
     */
    queueMaxBindCount?: number;
    /**
     * The maximum number of messages delivered but not acknowledged per flow for the MQTT Session Queue. Available since 2.14.
     */
    queueMaxDeliveredUnackedMsgsPerFlow?: number;
    /**
     * The maximum message size allowed in the MQTT Session Queue, in bytes (B). Available since 2.14.
     */
    queueMaxMsgSize?: number;
    /**
     * The maximum message spool usage allowed by the MQTT Session Queue, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking. Available since 2.14.
     */
    queueMaxMsgSpoolUsage?: number;
    /**
     * The maximum number of times the MQTT Session Queue will attempt redelivery of a message prior to it being discarded or moved to the DMQ. A value of 0 means to retry forever. Available since 2.14.
     */
    queueMaxRedeliveryCount?: number;
    /**
     * The maximum time in seconds a message can stay in the MQTT Session Queue when `queueRespectTtlEnabled` is `"true"`. A message expires when the lesser of the sender assigned time-to-live (TTL) in the message and the `queueMaxTtl` configured for the MQTT Session Queue, is exceeded. A value of 0 disables expiry. Available since 2.14.
     */
    queueMaxTtl?: number;
    /**
     * The name of the MQTT Session Queue.
     */
    queueName?: string;
    /**
     * Indicates whether to return negative acknowledgements (NACKs) to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. Available since 2.14.
     */
    queueRejectLowPriorityMsgEnabled?: boolean;
    /**
     * The number of messages of any priority in the MQTT Session Queue above which low priority messages are not admitted but higher priority messages are allowed. Available since 2.14.
     */
    queueRejectLowPriorityMsgLimit?: number;
    /**
     * Indicates whether negative acknowledgements (NACKs) are returned to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The allowed values and their meaning are:
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
     * Indicates whether the time-to-live (TTL) for messages in the MQTT Session Queue is respected. When enabled, expired messages are discarded or moved to the DMQ. Available since 2.14.
     */
    queueRespectTtlEnabled?: boolean;
    /**
     * The maximum number of outstanding QoS1 and QoS2 messages that the Client has signaled it is willing to accept. Note that there are other broker settings which may further limit the number of outstanding messasges. Available since 2.21.
     */
    rxMax?: number;
    /**
     * Indicates whether the MQTT Session has the Will message specified by the Client. The Will message is published if the Client disconnects without sending the MQTT DISCONNECT packet.
     */
    will?: boolean;
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
     * Indicates whether negative acknowledgements (NACKs) are returned to sending clients on message discards. Note that NACKs cause the message to not be delivered to any destination and Transacted Session commits to fail. The allowed values and their meaning are:
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
/* eslint-disable */


export type MsgVpnQueueMsg = {
    /**
     * The size of the Message attachment, in bytes (B).
     */
    attachmentSize?: number;
    /**
     * The size of the Message content, in bytes (B).
     */
    contentSize?: number;
    /**
     * The timestamp of when the Message is eligible for delivery. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.22.
     */
    deliveryEligibleTime?: number;
    /**
     * Indicates whether the Message is eligible for the Dead Message Queue (DMQ).
     */
    dmqEligible?: boolean;
    /**
     * The timestamp of when the Message expires. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    expiryTime?: number;
    /**
     * The identifier (ID) of the Message.
     */
    msgId?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The priority level of the Message, from 9 (highest) to 0 (lowest).
     */
    priority?: number;
    /**
     * The identifier (ID) of the Message publisher.
     */
    publisherId?: number;
    /**
     * The name of the Queue.
     */
    queueName?: string;
    /**
     * The number of times the Message has been redelivered.
     */
    redeliveryCount?: number;
    /**
     * The Message identifier (ID) on the replication mate. Applicable only to replicated messages.
     */
    replicatedMateMsgId?: number;
    /**
     * An ID that uniquely identifies this Message within this replication group. Available since 2.21.
     */
    replicationGroupMsgId?: string;
    /**
     * The replication state of the Message. The allowed values and their meaning are:
     *
     * <pre>
     * "replicated" - The Message is replicated to the remote Message VPN.
     * "not-replicated" - The Message is not being replicated to the remote Message VPN.
     * "pending-replication" - The Message is queued for replication to the remote Message VPN.
     * </pre>
     *
     */
    replicationState?: string;
    /**
     * The timestamp of when the Message was spooled in the Queue. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    spooledTime?: number;
    /**
     * Indicates whether delivery of the Message has never been attempted.
     */
    undelivered?: boolean;
}

export namespace MsgVpnQueueMsg {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueMsg';


}
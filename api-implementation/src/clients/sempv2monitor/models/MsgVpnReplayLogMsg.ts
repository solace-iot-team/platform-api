/* eslint-disable */


export type MsgVpnReplayLogMsg = {
    /**
     * The size of the message attachment, in bytes (B).
     */
    attachmentSize?: number;
    /**
     * The size of the message content, in bytes (B).
     */
    contentSize?: number;
    /**
     * Indicates whether the message is eligible for the Dead Message Queue (DMQ).
     */
    dmqEligible?: boolean;
    /**
     * The identifier (ID) of the message.
     */
    msgId?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The priority level of the message.
     */
    priority?: number;
    /**
     * The identifier (ID) of the message publisher.
     */
    publisherId?: number;
    /**
     * The name of the Replay Log.
     */
    replayLogName?: string;
    /**
     * An ID that uniquely identifies this Message within this replication group. Available since 2.21.
     */
    replicationGroupMsgId?: string;
    /**
     * The sequence number assigned to the message. Applicable only to messages received on sequenced topics.
     */
    sequenceNumber?: number;
    /**
     * The timestamp of when the message was spooled in the Replay Log. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    spooledTime?: number;
}

export namespace MsgVpnReplayLogMsg {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogMsg';


}
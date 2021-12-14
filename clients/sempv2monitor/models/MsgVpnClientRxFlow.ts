/* eslint-disable */


export type MsgVpnClientRxFlow = {
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * The timestamp of when the Flow from the Client connected.
     */
    connectTime?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to a destination group error.
     */
    destinationGroupErrorDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to being a duplicate.
     */
    duplicateDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to an eligible endpoint destination being disabled.
     */
    endpointDisabledDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to an eligible endpoint destination having its maximum message spool usage exceeded.
     */
    endpointUsageExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to errors being detected.
     */
    erroredDiscardedMsgCount?: number;
    /**
     * The identifier (ID) of the flow.
     */
    flowId?: number;
    /**
     * The name of the Flow.
     */
    flowName?: string;
    /**
     * The number of guaranteed messages from the Flow.
     */
    guaranteedMsgCount?: number;
    /**
     * The identifier (ID) of the last message received on the Flow.
     */
    lastRxMsgId?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to the maximum number of messages allowed on the broker being exceeded.
     */
    localMsgCountExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to congestion of low priority messages.
     */
    lowPriorityMsgCongestionDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to the maximum allowed message size being exceeded.
     */
    maxMsgSizeExceededDiscardedMsgCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The number of guaranteed messages from the Flow discarded due to there being no eligible endpoint destination.
     */
    noEligibleDestinationsDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to no local delivery being requested.
     */
    noLocalDeliveryDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to being incompatible with the forwarding mode of an eligible endpoint destination.
     */
    notCompatibleWithForwardingModeDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to being received out of order.
     */
    outOfOrderDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to being denied by the access control list (ACL) profile for the published topic.
     */
    publishAclDeniedDiscardedMsgCount?: number;
    /**
     * The identifier (ID) of the publisher for the Flow.
     */
    publisherId?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to the destination queue not being found.
     */
    queueNotFoundDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to the Message VPN being in the replication standby state.
     */
    replicationStandbyDiscardedMsgCount?: number;
    /**
     * The name of the transacted session on the Flow.
     */
    sessionName?: string;
    /**
     * The number of guaranteed messages from the Flow discarded due to the message time-to-live (TTL) count being exceeded. The message TTL count is the maximum number of times the message can cross a bridge between Message VPNs.
     */
    smfTtlExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to all available message spool file resources being used.
     */
    spoolFileLimitExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to the message spool being not ready.
     */
    spoolNotReadyDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to a failure while spooling to the Assured Delivery Blade (ADB).
     */
    spoolToAdbFailDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to a failure while spooling to the disk.
     */
    spoolToDiskFailDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to the maximum message spool usage being exceeded.
     */
    spoolUsageExceededDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to synchronous replication being ineligible.
     */
    syncReplicationIneligibleDiscardedMsgCount?: number;
    /**
     * The number of guaranteed messages from the Flow discarded due to being denied by the client profile.
     */
    userProfileDeniedGuaranteedDiscardedMsgCount?: number;
    /**
     * The size of the window used for guaranteed messages sent on the Flow, in messages.
     */
    windowSize?: number;
}

export namespace MsgVpnClientRxFlow {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientRxFlow';


}
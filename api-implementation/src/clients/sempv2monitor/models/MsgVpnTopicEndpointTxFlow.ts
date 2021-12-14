/* eslint-disable */


export type MsgVpnTopicEndpointTxFlow = {
    /**
     * The number of guaranteed messages delivered and acknowledged by the consumer.
     */
    ackedMsgCount?: number;
    /**
     * The activity state of the Flow. The allowed values and their meaning are:
     *
     * <pre>
     * "active-browser" - The Flow is active as a browser.
     * "active-consumer" - The Flow is active as a consumer.
     * "inactive" - The Flow is inactive.
     * </pre>
     *
     */
    activityState?: string;
    /**
     * The timestamp of when the Flow bound to the Topic Endpoint. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    bindTime?: number;
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * Indicates whether redelivery requests can be received as negative acknowledgements (NACKs) from the consumer. Applicable only to REST consumers.
     */
    consumerRedeliveryRequestAllowed?: boolean;
    /**
     * The number of guaranteed messages that used cut-through delivery and are acknowledged by the consumer.
     */
    cutThroughAckedMsgCount?: number;
    /**
     * The delivery state of the Flow. The allowed values and their meaning are:
     *
     * <pre>
     * "closed" - The Flow is unbound.
     * "opened" - The Flow is bound but inactive.
     * "unbinding" - The Flow received an unbind request.
     * "handshaking" - The Flow is handshaking to become active.
     * "deliver-cut-through" - The Flow is streaming messages using direct+guaranteed delivery.
     * "deliver-from-input-stream" - The Flow is streaming messages using guaranteed delivery.
     * "deliver-from-memory" - The Flow throttled causing message delivery from memory (RAM).
     * "deliver-from-spool" - The Flow stalled causing message delivery from spool (ADB or disk).
     * </pre>
     *
     */
    deliveryState?: string;
    /**
     * The identifier (ID) of the Flow.
     */
    flowId?: number;
    /**
     * The highest identifier (ID) of message transmitted and waiting for acknowledgement.
     */
    highestAckPendingMsgId?: number;
    /**
     * The identifier (ID) of the last message transmitted and acknowledged by the consumer.
     */
    lastAckedMsgId?: number;
    /**
     * The lowest identifier (ID) of message transmitted and waiting for acknowledgement.
     */
    lowestAckPendingMsgId?: number;
    /**
     * The number of guaranteed messages that exceeded the maximum number of delivered unacknowledged messages.
     */
    maxUnackedMsgsExceededMsgCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether not to deliver messages to a consumer that published them.
     */
    noLocalDelivery?: boolean;
    /**
     * The number of guaranteed messages that were redelivered.
     */
    redeliveredMsgCount?: number;
    /**
     * The number of consumer requests via negative acknowledgements (NACKs) to redeliver guaranteed messages.
     */
    redeliveryRequestCount?: number;
    /**
     * The name of the Transacted Session for the Flow.
     */
    sessionName?: string;
    /**
     * The number of guaranteed messages that used store and forward delivery and are acknowledged by the consumer.
     */
    storeAndForwardAckedMsgCount?: number;
    /**
     * The name of the Topic Endpoint.
     */
    topicEndpointName?: string;
    /**
     * The number of guaranteed messages that were retransmitted at the transport layer as part of a single delivery attempt. Available since 2.18.
     */
    transportRetransmitMsgCount?: number;
    /**
     * The number of guaranteed messages delivered but not yet acknowledged by the consumer.
     */
    unackedMsgCount?: number;
    /**
     * The number of guaranteed messages using the available window size.
     */
    usedWindowSize?: number;
    /**
     * The number of times the window for guaranteed messages was filled and closed before an acknowledgement was received.
     */
    windowClosedCount?: number;
    /**
     * The number of outstanding guaranteed messages that can be transmitted over the Flow before an acknowledgement is received.
     */
    windowSize?: number;
}

export namespace MsgVpnTopicEndpointTxFlow {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointTxFlow';


}
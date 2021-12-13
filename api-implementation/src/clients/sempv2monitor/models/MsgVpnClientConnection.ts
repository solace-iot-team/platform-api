/* eslint-disable */


export type MsgVpnClientConnection = {
    /**
     * The IP address and TCP port on the Client side of the Client Connection.
     */
    clientAddress?: string;
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * Indicates whether compression is enabled for the Client Connection.
     */
    compression?: boolean;
    /**
     * Indicates whether encryption (TLS) is enabled for the Client Connection.
     */
    encryption?: boolean;
    /**
     * The number of TCP fast retransmits due to duplicate acknowledgments (ACKs). See RFC 5681 for further details.
     */
    fastRetransmitCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The number of bytes currently in the receive queue for the Client Connection.
     */
    rxQueueByteCount?: number;
    /**
     * The number of TCP segments received from the Client Connection out of order.
     */
    segmentReceivedOutOfOrderCount?: number;
    /**
     * The TCP smoothed round-trip time (SRTT) for the Client Connection, in nanoseconds. See RFC 2988 for further details.
     */
    smoothedRoundTripTime?: number;
    /**
     * The TCP state of the Client Connection. When fully operational, should be: established. See RFC 793 for further details. The allowed values and their meaning are:
     *
     * <pre>
     * "closed" - No connection state at all.
     * "listen" - Waiting for a connection request from any remote TCP and port.
     * "syn-sent" - Waiting for a matching connection request after having sent a connection request.
     * "syn-received" - Waiting for a confirming connection request acknowledgment after having both received and sent a connection request.
     * "established" - An open connection, data received can be delivered to the user.
     * "close-wait" - Waiting for a connection termination request from the local user.
     * "fin-wait-1" - Waiting for a connection termination request from the remote TCP, or an acknowledgment of the connection termination request previously sent.
     * "closing" - Waiting for a connection termination request acknowledgment from the remote TCP.
     * "last-ack" - Waiting for an acknowledgment of the connection termination request previously sent to the remote TCP.
     * "fin-wait-2" - Waiting for a connection termination request from the remote TCP.
     * "time-wait" - Waiting for enough time to pass to be sure the remote TCP received the acknowledgment of its connection termination request.
     * </pre>
     *
     */
    tcpState?: string;
    /**
     * The number of TCP segments retransmitted due to timeout awaiting an acknowledgement (ACK). See RFC 793 for further details.
     */
    timedRetransmitCount?: number;
    /**
     * The number of bytes currently in the transmit queue for the Client Connection.
     */
    txQueueByteCount?: number;
    /**
     * The amount of time in seconds since the Client Connection was established.
     */
    uptime?: number;
}

export namespace MsgVpnClientConnection {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientConnection';


}
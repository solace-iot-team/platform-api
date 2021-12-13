/* eslint-disable */


export type MsgVpnJndiConnectionFactory = {
    /**
     * Indicates whether new JMS connections can use the same Client identifier (ID) as an existing connection.
     */
    allowDuplicateClientIdEnabled?: boolean;
    /**
     * The description of the Client.
     */
    clientDescription?: string;
    /**
     * The Client identifier (ID). If not specified, a unique value for it will be generated.
     */
    clientId?: string;
    /**
     * The name of the JMS Connection Factory.
     */
    connectionFactoryName?: string;
    /**
     * Indicates whether overriding by the Subscriber (Consumer) of the deliver-to-one (DTO) property on messages is enabled. When enabled, the Subscriber can receive all DTO tagged messages.
     */
    dtoReceiveOverrideEnabled?: boolean;
    /**
     * The priority for receiving deliver-to-one (DTO) messages by the Subscriber (Consumer) if the messages are published on the local broker that the Subscriber is directly connected to.
     */
    dtoReceiveSubscriberLocalPriority?: number;
    /**
     * The priority for receiving deliver-to-one (DTO) messages by the Subscriber (Consumer) if the messages are published on a remote broker.
     */
    dtoReceiveSubscriberNetworkPriority?: number;
    /**
     * Indicates whether the deliver-to-one (DTO) property is enabled on messages sent by the Publisher (Producer).
     */
    dtoSendEnabled?: boolean;
    /**
     * Indicates whether a durable endpoint will be dynamically created on the broker when the client calls "Session.createDurableSubscriber()" or "Session.createQueue()". The created endpoint respects the message time-to-live (TTL) according to the "dynamicEndpointRespectTtlEnabled" property.
     */
    dynamicEndpointCreateDurableEnabled?: boolean;
    /**
     * Indicates whether dynamically created durable and non-durable endpoints respect the message time-to-live (TTL) property.
     */
    dynamicEndpointRespectTtlEnabled?: boolean;
    /**
     * The timeout for sending the acknowledgement (ACK) for guaranteed messages received by the Subscriber (Consumer), in milliseconds.
     */
    guaranteedReceiveAckTimeout?: number;
    /**
     * The maximum number of attempts to reconnect to the host or list of hosts after the guaranteed  messaging connection has been lost. The value "-1" means to retry forever. Available since 2.14.
     */
    guaranteedReceiveReconnectRetryCount?: number;
    /**
     * The amount of time to wait before making another attempt to connect or reconnect to the host after the guaranteed messaging connection has been lost, in milliseconds. Available since 2.14.
     */
    guaranteedReceiveReconnectRetryWait?: number;
    /**
     * The size of the window for guaranteed messages received by the Subscriber (Consumer), in messages.
     */
    guaranteedReceiveWindowSize?: number;
    /**
     * The threshold for sending the acknowledgement (ACK) for guaranteed messages received by the Subscriber (Consumer) as a percentage of `guaranteedReceiveWindowSize`.
     */
    guaranteedReceiveWindowSizeAckThreshold?: number;
    /**
     * The timeout for receiving the acknowledgement (ACK) for guaranteed messages sent by the Publisher (Producer), in milliseconds.
     */
    guaranteedSendAckTimeout?: number;
    /**
     * The size of the window for non-persistent guaranteed messages sent by the Publisher (Producer), in messages. For persistent messages the window size is fixed at 1.
     */
    guaranteedSendWindowSize?: number;
    /**
     * The default delivery mode for messages sent by the Publisher (Producer). The allowed values and their meaning are:
     *
     * <pre>
     * "persistent" - The broker spools messages (persists in the Message Spool) as part of the send operation.
     * "non-persistent" - The broker does not spool messages (does not persist in the Message Spool) as part of the send operation.
     * </pre>
     *
     */
    messagingDefaultDeliveryMode?: MsgVpnJndiConnectionFactory.messagingDefaultDeliveryMode;
    /**
     * Indicates whether messages sent by the Publisher (Producer) are Dead Message Queue (DMQ) eligible by default.
     */
    messagingDefaultDmqEligibleEnabled?: boolean;
    /**
     * Indicates whether messages sent by the Publisher (Producer) are Eliding eligible by default.
     */
    messagingDefaultElidingEligibleEnabled?: boolean;
    /**
     * Indicates whether to include (add or replace) the JMSXUserID property in messages sent by the Publisher (Producer).
     */
    messagingJmsxUserIdEnabled?: boolean;
    /**
     * Indicates whether encoding of JMS text messages in Publisher (Producer) messages is as XML payload. When disabled, JMS text messages are encoded as a binary attachment.
     */
    messagingTextInXmlPayloadEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The ZLIB compression level for the connection to the broker. The value "0" means no compression, and the value "-1" means the compression level is specified in the JNDI Properties file.
     */
    transportCompressionLevel?: number;
    /**
     * The maximum number of retry attempts to establish an initial connection to the host or list of hosts. The value "0" means a single attempt (no retries), and the value "-1" means to retry forever.
     */
    transportConnectRetryCount?: number;
    /**
     * The maximum number of retry attempts to establish an initial connection to each host on the list of hosts. The value "0" means a single attempt (no retries), and the value "-1" means to retry forever.
     */
    transportConnectRetryPerHostCount?: number;
    /**
     * The timeout for establishing an initial connection to the broker, in milliseconds.
     */
    transportConnectTimeout?: number;
    /**
     * Indicates whether usage of the Direct Transport mode for sending non-persistent messages is enabled. When disabled, the Guaranteed Transport mode is used.
     */
    transportDirectTransportEnabled?: boolean;
    /**
     * The maximum number of consecutive application-level keepalive messages sent without the broker response before the connection to the broker is closed.
     */
    transportKeepaliveCount?: number;
    /**
     * Indicates whether application-level keepalive messages are used to maintain a connection with the Router.
     */
    transportKeepaliveEnabled?: boolean;
    /**
     * The interval between application-level keepalive messages, in milliseconds.
     */
    transportKeepaliveInterval?: number;
    /**
     * Indicates whether delivery of asynchronous messages is done directly from the I/O thread.
     */
    transportMsgCallbackOnIoThreadEnabled?: boolean;
    /**
     * Indicates whether optimization for the Direct Transport delivery mode is enabled. If enabled, the client application is limited to one Publisher (Producer) and one non-durable Subscriber (Consumer).
     */
    transportOptimizeDirectEnabled?: boolean;
    /**
     * The connection port number on the broker for SMF clients. The value "-1" means the port is specified in the JNDI Properties file.
     */
    transportPort?: number;
    /**
     * The timeout for reading a reply from the broker, in milliseconds.
     */
    transportReadTimeout?: number;
    /**
     * The size of the receive socket buffer, in bytes. It corresponds to the SO_RCVBUF socket option.
     */
    transportReceiveBufferSize?: number;
    /**
     * The maximum number of attempts to reconnect to the host or list of hosts after the connection has been lost. The value "-1" means to retry forever.
     */
    transportReconnectRetryCount?: number;
    /**
     * The amount of time before making another attempt to connect or reconnect to the host after the connection has been lost, in milliseconds.
     */
    transportReconnectRetryWait?: number;
    /**
     * The size of the send socket buffer, in bytes. It corresponds to the SO_SNDBUF socket option.
     */
    transportSendBufferSize?: number;
    /**
     * Indicates whether the TCP_NODELAY option is enabled, which disables Nagle's algorithm for TCP/IP congestion control (RFC 896).
     */
    transportTcpNoDelayEnabled?: boolean;
    /**
     * Indicates whether this is an XA Connection Factory. When enabled, the Connection Factory can be cast to "XAConnectionFactory", "XAQueueConnectionFactory" or "XATopicConnectionFactory".
     */
    xaEnabled?: boolean;
}

export namespace MsgVpnJndiConnectionFactory {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiConnectionFactory';

    /**
     * The default delivery mode for messages sent by the Publisher (Producer). The allowed values and their meaning are:
     *
     * <pre>
     * "persistent" - The broker spools messages (persists in the Message Spool) as part of the send operation.
     * "non-persistent" - The broker does not spool messages (does not persist in the Message Spool) as part of the send operation.
     * </pre>
     *
     */
    export enum messagingDefaultDeliveryMode {
        PERSISTENT = 'persistent',
        NON_PERSISTENT = 'non-persistent',
    }


}
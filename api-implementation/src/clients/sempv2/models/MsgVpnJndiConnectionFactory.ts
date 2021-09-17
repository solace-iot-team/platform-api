/* eslint-disable */


export type MsgVpnJndiConnectionFactory = {
    /**
     * Enable or disable whether new JMS connections can use the same Client identifier (ID) as an existing connection. The default value is `false`. Available since 2.3.
     */
    allowDuplicateClientIdEnabled?: boolean;
    /**
     * The description of the Client. The default value is `""`.
     */
    clientDescription?: string;
    /**
     * The Client identifier (ID). If not specified, a unique value for it will be generated. The default value is `""`.
     */
    clientId?: string;
    /**
     * The name of the JMS Connection Factory.
     */
    connectionFactoryName?: string;
    /**
     * Enable or disable overriding by the Subscriber (Consumer) of the deliver-to-one (DTO) property on messages. When enabled, the Subscriber can receive all DTO tagged messages. The default value is `true`.
     */
    dtoReceiveOverrideEnabled?: boolean;
    /**
     * The priority for receiving deliver-to-one (DTO) messages by the Subscriber (Consumer) if the messages are published on the local broker that the Subscriber is directly connected to. The default value is `1`.
     */
    dtoReceiveSubscriberLocalPriority?: number;
    /**
     * The priority for receiving deliver-to-one (DTO) messages by the Subscriber (Consumer) if the messages are published on a remote broker. The default value is `1`.
     */
    dtoReceiveSubscriberNetworkPriority?: number;
    /**
     * Enable or disable the deliver-to-one (DTO) property on messages sent by the Publisher (Producer). The default value is `false`.
     */
    dtoSendEnabled?: boolean;
    /**
     * Enable or disable whether a durable endpoint will be dynamically created on the broker when the client calls "Session.createDurableSubscriber()" or "Session.createQueue()". The created endpoint respects the message time-to-live (TTL) according to the "dynamicEndpointRespectTtlEnabled" property. The default value is `false`.
     */
    dynamicEndpointCreateDurableEnabled?: boolean;
    /**
     * Enable or disable whether dynamically created durable and non-durable endpoints respect the message time-to-live (TTL) property. The default value is `true`.
     */
    dynamicEndpointRespectTtlEnabled?: boolean;
    /**
     * The timeout for sending the acknowledgement (ACK) for guaranteed messages received by the Subscriber (Consumer), in milliseconds. The default value is `1000`.
     */
    guaranteedReceiveAckTimeout?: number;
    /**
     * The maximum number of attempts to reconnect to the host or list of hosts after the guaranteed  messaging connection has been lost. The value "-1" means to retry forever. The default value is `-1`. Available since 2.14.
     */
    guaranteedReceiveReconnectRetryCount?: number;
    /**
     * The amount of time to wait before making another attempt to connect or reconnect to the host after the guaranteed messaging connection has been lost, in milliseconds. The default value is `3000`. Available since 2.14.
     */
    guaranteedReceiveReconnectRetryWait?: number;
    /**
     * The size of the window for guaranteed messages received by the Subscriber (Consumer), in messages. The default value is `18`.
     */
    guaranteedReceiveWindowSize?: number;
    /**
     * The threshold for sending the acknowledgement (ACK) for guaranteed messages received by the Subscriber (Consumer) as a percentage of `guaranteedReceiveWindowSize`. The default value is `60`.
     */
    guaranteedReceiveWindowSizeAckThreshold?: number;
    /**
     * The timeout for receiving the acknowledgement (ACK) for guaranteed messages sent by the Publisher (Producer), in milliseconds. The default value is `2000`.
     */
    guaranteedSendAckTimeout?: number;
    /**
     * The size of the window for non-persistent guaranteed messages sent by the Publisher (Producer), in messages. For persistent messages the window size is fixed at 1. The default value is `255`.
     */
    guaranteedSendWindowSize?: number;
    /**
     * The default delivery mode for messages sent by the Publisher (Producer). The default value is `"persistent"`. The allowed values and their meaning are:
     *
     * <pre>
     * "persistent" - The broker spools messages (persists in the Message Spool) as part of the send operation.
     * "non-persistent" - The broker does not spool messages (does not persist in the Message Spool) as part of the send operation.
     * </pre>
     *
     */
    messagingDefaultDeliveryMode?: MsgVpnJndiConnectionFactory.messagingDefaultDeliveryMode;
    /**
     * Enable or disable whether messages sent by the Publisher (Producer) are Dead Message Queue (DMQ) eligible by default. The default value is `false`.
     */
    messagingDefaultDmqEligibleEnabled?: boolean;
    /**
     * Enable or disable whether messages sent by the Publisher (Producer) are Eliding eligible by default. The default value is `false`.
     */
    messagingDefaultElidingEligibleEnabled?: boolean;
    /**
     * Enable or disable inclusion (adding or replacing) of the JMSXUserID property in messages sent by the Publisher (Producer). The default value is `false`.
     */
    messagingJmsxUserIdEnabled?: boolean;
    /**
     * Enable or disable encoding of JMS text messages in Publisher (Producer) messages as XML payload. When disabled, JMS text messages are encoded as a binary attachment. The default value is `true`.
     */
    messagingTextInXmlPayloadEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The ZLIB compression level for the connection to the broker. The value "0" means no compression, and the value "-1" means the compression level is specified in the JNDI Properties file. The default value is `-1`.
     */
    transportCompressionLevel?: number;
    /**
     * The maximum number of retry attempts to establish an initial connection to the host or list of hosts. The value "0" means a single attempt (no retries), and the value "-1" means to retry forever. The default value is `0`.
     */
    transportConnectRetryCount?: number;
    /**
     * The maximum number of retry attempts to establish an initial connection to each host on the list of hosts. The value "0" means a single attempt (no retries), and the value "-1" means to retry forever. The default value is `0`.
     */
    transportConnectRetryPerHostCount?: number;
    /**
     * The timeout for establishing an initial connection to the broker, in milliseconds. The default value is `30000`.
     */
    transportConnectTimeout?: number;
    /**
     * Enable or disable usage of the Direct Transport mode for sending non-persistent messages. When disabled, the Guaranteed Transport mode is used. The default value is `true`.
     */
    transportDirectTransportEnabled?: boolean;
    /**
     * The maximum number of consecutive application-level keepalive messages sent without the broker response before the connection to the broker is closed. The default value is `3`.
     */
    transportKeepaliveCount?: number;
    /**
     * Enable or disable usage of application-level keepalive messages to maintain a connection with the broker. The default value is `true`.
     */
    transportKeepaliveEnabled?: boolean;
    /**
     * The interval between application-level keepalive messages, in milliseconds. The default value is `3000`.
     */
    transportKeepaliveInterval?: number;
    /**
     * Enable or disable delivery of asynchronous messages directly from the I/O thread. Contact Solace Support before enabling this property. The default value is `false`.
     */
    transportMsgCallbackOnIoThreadEnabled?: boolean;
    /**
     * Enable or disable optimization for the Direct Transport delivery mode. If enabled, the client application is limited to one Publisher (Producer) and one non-durable Subscriber (Consumer). The default value is `false`.
     */
    transportOptimizeDirectEnabled?: boolean;
    /**
     * The connection port number on the broker for SMF clients. The value "-1" means the port is specified in the JNDI Properties file. The default value is `-1`.
     */
    transportPort?: number;
    /**
     * The timeout for reading a reply from the broker, in milliseconds. The default value is `10000`.
     */
    transportReadTimeout?: number;
    /**
     * The size of the receive socket buffer, in bytes. It corresponds to the SO_RCVBUF socket option. The default value is `65536`.
     */
    transportReceiveBufferSize?: number;
    /**
     * The maximum number of attempts to reconnect to the host or list of hosts after the connection has been lost. The value "-1" means to retry forever. The default value is `3`.
     */
    transportReconnectRetryCount?: number;
    /**
     * The amount of time before making another attempt to connect or reconnect to the host after the connection has been lost, in milliseconds. The default value is `3000`.
     */
    transportReconnectRetryWait?: number;
    /**
     * The size of the send socket buffer, in bytes. It corresponds to the SO_SNDBUF socket option. The default value is `65536`.
     */
    transportSendBufferSize?: number;
    /**
     * Enable or disable the TCP_NODELAY option. When enabled, Nagle's algorithm for TCP/IP congestion control (RFC 896) is disabled. The default value is `true`.
     */
    transportTcpNoDelayEnabled?: boolean;
    /**
     * Enable or disable this as an XA Connection Factory. When enabled, the Connection Factory can be cast to "XAConnectionFactory", "XAQueueConnectionFactory" or "XATopicConnectionFactory". The default value is `false`.
     */
    xaEnabled?: boolean;
}

export namespace MsgVpnJndiConnectionFactory {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiConnectionFactory';

    /**
     * The default delivery mode for messages sent by the Publisher (Producer). The default value is `"persistent"`. The allowed values and their meaning are:
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
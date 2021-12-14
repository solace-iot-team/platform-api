/* eslint-disable */


export type MsgVpnClient = {
    /**
     * The name of the access control list (ACL) profile of the Client.
     */
    aclProfileName?: string;
    /**
     * The name of the original MsgVpn which the client signaled in. Available since 2.14.
     */
    aliasedFromMsgVpnName?: string;
    /**
     * The number of Client bind failures due to endpoint being already bound.
     */
    alreadyBoundBindFailureCount?: number;
    /**
     * The name of the authorization group of the Client.
     */
    authorizationGroupName?: string;
    /**
     * The one minute average of the message rate received from the Client, in bytes per second (B/sec).
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the message rate received from the Client, in messages per second (msg/sec).
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the message rate transmitted to the Client, in bytes per second (B/sec).
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the message rate transmitted to the Client, in messages per second (msg/sec).
     */
    averageTxMsgRate?: number;
    /**
     * The number of Client requests to bind to an endpoint.
     */
    bindRequestCount?: number;
    /**
     * The number of successful Client requests to bind to an endpoint.
     */
    bindSuccessCount?: number;
    /**
     * The IP address and port of the Client.
     */
    clientAddress?: string;
    /**
     * The identifier (ID) of the Client.
     */
    clientId?: number;
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * The name of the client profile of the Client.
     */
    clientProfileName?: string;
    /**
     * The client username of the Client used for authorization.
     */
    clientUsername?: string;
    /**
     * The amount of client control messages received from the Client, in bytes (B).
     */
    controlRxByteCount?: number;
    /**
     * The number of client control messages received from the Client.
     */
    controlRxMsgCount?: number;
    /**
     * The amount of client control messages transmitted to the Client, in bytes (B).
     */
    controlTxByteCount?: number;
    /**
     * The number of client control messages transmitted to the Client.
     */
    controlTxMsgCount?: number;
    /**
     * The number of Client bind failures due to being denied cut-through forwarding.
     */
    cutThroughDeniedBindFailureCount?: number;
    /**
     * The amount of client data messages received from the Client, in bytes (B).
     */
    dataRxByteCount?: number;
    /**
     * The number of client data messages received from the Client.
     */
    dataRxMsgCount?: number;
    /**
     * The amount of client data messages transmitted to the Client, in bytes (B).
     */
    dataTxByteCount?: number;
    /**
     * The number of client data messages transmitted to the Client.
     */
    dataTxMsgCount?: number;
    /**
     * The description text of the Client.
     */
    description?: string;
    /**
     * The number of Client bind failures due to endpoint being disabled.
     */
    disabledBindFailureCount?: number;
    /**
     * The priority of the Client's subscriptions for receiving deliver-to-one (DTO) messages published on the local broker.
     */
    dtoLocalPriority?: number;
    /**
     * The priority of the Client's subscriptions for receiving deliver-to-one (DTO) messages published on a remote broker.
     */
    dtoNetworkPriority?: number;
    /**
     * Indicates whether message eliding is enabled for the Client.
     */
    eliding?: boolean;
    /**
     * The number of topics requiring message eliding for the Client.
     */
    elidingTopicCount?: number;
    /**
     * The peak number of topics requiring message eliding for the Client.
     */
    elidingTopicPeakCount?: number;
    /**
     * The number of Client bind failures due to being denied guaranteed messaging.
     */
    guaranteedDeniedBindFailureCount?: number;
    /**
     * The number of Client bind failures due to an invalid selector.
     */
    invalidSelectorBindFailureCount?: number;
    /**
     * Indicates whether keepalive messages from the Client are received by the broker. Applicable for SMF and MQTT clients only. Available since 2.19.
     */
    keepalive?: boolean;
    /**
     * The maximum period of time the broker will accept inactivity from the Client before disconnecting, in seconds. Available since 2.19.
     */
    keepaliveEffectiveTimeout?: number;
    /**
     * Indicates whether the large-message event has been raised for the Client.
     */
    largeMsgEventRaised?: boolean;
    /**
     * The number of login request messages received from the Client.
     */
    loginRxMsgCount?: number;
    /**
     * The number of login response messages transmitted to the Client.
     */
    loginTxMsgCount?: number;
    /**
     * The number of Client bind failures due to the endpoint maximum bind count being exceeded.
     */
    maxBindCountExceededBindFailureCount?: number;
    /**
     * Indicates whether the max-eliding-topic-count event has been raised for the Client.
     */
    maxElidingTopicCountEventRaised?: boolean;
    /**
     * The number of MQTT connect acknowledgment (CONNACK) refused response packets transmitted to the Client.
     */
    mqttConnackErrorTxCount?: number;
    /**
     * The number of MQTT connect acknowledgment (CONNACK) accepted response packets transmitted to the Client.
     */
    mqttConnackTxCount?: number;
    /**
     * The number of MQTT connect (CONNECT) request packets received from the Client.
     */
    mqttConnectRxCount?: number;
    /**
     * The number of MQTT disconnect (DISCONNECT) request packets received from the Client.
     */
    mqttDisconnectRxCount?: number;
    /**
     * The number of MQTT ping request (PINGREQ) packets received from the Client.
     */
    mqttPingreqRxCount?: number;
    /**
     * The number of MQTT ping response (PINGRESP) packets transmitted to the Client.
     */
    mqttPingrespTxCount?: number;
    /**
     * The number of MQTT publish acknowledgement (PUBACK) response packets received from the Client.
     */
    mqttPubackRxCount?: number;
    /**
     * The number of MQTT publish acknowledgement (PUBACK) response packets transmitted to the Client.
     */
    mqttPubackTxCount?: number;
    /**
     * The number of MQTT publish complete (PUBCOMP) packets transmitted to the Client in response to a PUBREL packet. These packets are the fourth and final packet of a QoS 2 protocol exchange.
     */
    mqttPubcompTxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 0 message delivery.
     */
    mqttPublishQos0RxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets transmitted to the Client for QoS 0 message delivery.
     */
    mqttPublishQos0TxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 1 message delivery.
     */
    mqttPublishQos1RxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets transmitted to the Client for QoS 1 message delivery.
     */
    mqttPublishQos1TxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 2 message delivery.
     */
    mqttPublishQos2RxCount?: number;
    /**
     * The number of MQTT publish received (PUBREC) packets transmitted to the Client in response to a PUBLISH packet with QoS 2. These packets are the second packet of a QoS 2 protocol exchange.
     */
    mqttPubrecTxCount?: number;
    /**
     * The number of MQTT publish release (PUBREL) packets received from the Client in response to a PUBREC packet. These packets are the third packet of a QoS 2 protocol exchange.
     */
    mqttPubrelRxCount?: number;
    /**
     * The number of MQTT subscribe acknowledgement (SUBACK) failure response packets transmitted to the Client.
     */
    mqttSubackErrorTxCount?: number;
    /**
     * The number of MQTT subscribe acknowledgement (SUBACK) response packets transmitted to the Client.
     */
    mqttSubackTxCount?: number;
    /**
     * The number of MQTT subscribe (SUBSCRIBE) request packets received from the Client to create one or more topic subscriptions.
     */
    mqttSubscribeRxCount?: number;
    /**
     * The number of MQTT unsubscribe acknowledgement (UNSUBACK) response packets transmitted to the Client.
     */
    mqttUnsubackTxCount?: number;
    /**
     * The number of MQTT unsubscribe (UNSUBSCRIBE) request packets received from the Client to remove one or more topic subscriptions.
     */
    mqttUnsubscribeRxCount?: number;
    /**
     * The number of messages from the Client discarded due to message spool congestion primarily caused by message promotion.
     */
    msgSpoolCongestionRxDiscardedMsgCount?: number;
    /**
     * The number of messages from the Client discarded by the message spool.
     */
    msgSpoolRxDiscardedMsgCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether not to deliver messages to the Client if it published them.
     */
    noLocalDelivery?: boolean;
    /**
     * The number of messages from the Client discarded due to no matching subscription found.
     */
    noSubscriptionMatchRxDiscardedMsgCount?: number;
    /**
     * The original value of the client username used for Client authentication.
     */
    originalClientUsername?: string;
    /**
     * The number of Client bind failures due to other reasons.
     */
    otherBindFailureCount?: number;
    /**
     * The platform the Client application software was built for, which may include the OS and API type.
     */
    platform?: string;
    /**
     * The number of messages from the Client discarded due to the publish topic being denied by the Access Control List (ACL) profile.
     */
    publishTopicAclRxDiscardedMsgCount?: number;
    /**
     * The amount of HTTP request messages received from the Client, in bytes (B).
     */
    restHttpRequestRxByteCount?: number;
    /**
     * The number of HTTP request messages received from the Client.
     */
    restHttpRequestRxMsgCount?: number;
    /**
     * The amount of HTTP request messages transmitted to the Client, in bytes (B).
     */
    restHttpRequestTxByteCount?: number;
    /**
     * The number of HTTP request messages transmitted to the Client.
     */
    restHttpRequestTxMsgCount?: number;
    /**
     * The number of HTTP client/server error response messages received from the Client.
     */
    restHttpResponseErrorRxMsgCount?: number;
    /**
     * The number of HTTP client/server error response messages transmitted to the Client.
     */
    restHttpResponseErrorTxMsgCount?: number;
    /**
     * The amount of HTTP response messages received from the Client, in bytes (B).
     */
    restHttpResponseRxByteCount?: number;
    /**
     * The number of HTTP response messages received from the Client.
     */
    restHttpResponseRxMsgCount?: number;
    /**
     * The number of HTTP successful response messages received from the Client.
     */
    restHttpResponseSuccessRxMsgCount?: number;
    /**
     * The number of HTTP successful response messages transmitted to the Client.
     */
    restHttpResponseSuccessTxMsgCount?: number;
    /**
     * The number of HTTP wait for reply timeout response messages received from the Client.
     */
    restHttpResponseTimeoutRxMsgCount?: number;
    /**
     * The number of HTTP wait for reply timeout response messages transmitted to the Client.
     */
    restHttpResponseTimeoutTxMsgCount?: number;
    /**
     * The amount of HTTP response messages transmitted to the Client, in bytes (B).
     */
    restHttpResponseTxByteCount?: number;
    /**
     * The number of HTTP response messages transmitted to the Client.
     */
    restHttpResponseTxMsgCount?: number;
    /**
     * The amount of messages received from the Client, in bytes (B).
     */
    rxByteCount?: number;
    /**
     * The current message rate received from the Client, in bytes per second (B/sec).
     */
    rxByteRate?: number;
    /**
     * The number of messages discarded during reception from the Client.
     */
    rxDiscardedMsgCount?: number;
    /**
     * The number of messages received from the Client.
     */
    rxMsgCount?: number;
    /**
     * The current message rate received from the Client, in messages per second (msg/sec).
     */
    rxMsgRate?: number;
    /**
     * The timestamp of when the Client will be disconnected by the broker. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.13.
     */
    scheduledDisconnectTime?: number;
    /**
     * Indicates whether the Client is a slow subscriber and blocks for a few seconds when receiving messages.
     */
    slowSubscriber?: boolean;
    /**
     * The date the Client application software was built.
     */
    softwareDate?: string;
    /**
     * The version of the Client application software.
     */
    softwareVersion?: string;
    /**
     * The description of the TLS cipher used by the Client, which may include cipher name, key exchange and encryption algorithms.
     */
    tlsCipherDescription?: string;
    /**
     * Indicates whether the Client TLS connection was downgraded to plain-text to increase performance.
     */
    tlsDowngradedToPlainText?: boolean;
    /**
     * The version of TLS used by the Client.
     */
    tlsVersion?: string;
    /**
     * The number of messages from the Client discarded due to an error while parsing the publish topic.
     */
    topicParseErrorRxDiscardedMsgCount?: number;
    /**
     * The amount of messages transmitted to the Client, in bytes (B).
     */
    txByteCount?: number;
    /**
     * The current message rate transmitted to the Client, in bytes per second (B/sec).
     */
    txByteRate?: number;
    /**
     * The number of messages discarded during transmission to the Client.
     */
    txDiscardedMsgCount?: number;
    /**
     * The number of messages transmitted to the Client.
     */
    txMsgCount?: number;
    /**
     * The current message rate transmitted to the Client, in messages per second (msg/sec).
     */
    txMsgRate?: number;
    /**
     * The amount of time in seconds since the Client connected.
     */
    uptime?: number;
    /**
     * The user description for the Client, which may include computer name and process ID.
     */
    user?: string;
    /**
     * The virtual router used by the Client. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The Client is using the primary virtual router.
     * "backup" - The Client is using the backup virtual router.
     * "internal" - The Client is using the internal virtual router.
     * "unknown" - The Client virtual router is unknown.
     * </pre>
     *
     */
    virtualRouter?: string;
    /**
     * The maximum web transport timeout for the Client being inactive, in seconds.
     */
    webInactiveTimeout?: number;
    /**
     * The maximum web transport message payload size which excludes the size of the message header, in bytes.
     */
    webMaxPayload?: number;
    /**
     * The number of messages from the Client discarded due to an error while parsing the web message.
     */
    webParseErrorRxDiscardedMsgCount?: number;
    /**
     * The remaining web transport timeout for the Client being inactive, in seconds.
     */
    webRemainingTimeout?: number;
    /**
     * The amount of web transport messages received from the Client, in bytes (B).
     */
    webRxByteCount?: number;
    /**
     * The type of encoding used during reception from the Client. The allowed values and their meaning are:
     *
     * <pre>
     * "binary" - The Client is using binary encoding.
     * "base64" - The Client is using base64 encoding.
     * "illegal" - The Client is using an illegal encoding type.
     * </pre>
     *
     */
    webRxEncoding?: string;
    /**
     * The number of web transport messages received from the Client.
     */
    webRxMsgCount?: number;
    /**
     * The type of web transport used during reception from the Client. The allowed values and their meaning are:
     *
     * <pre>
     * "ws-binary" - The Client is using WebSocket binary transport.
     * "http-binary-streaming" - The Client is using HTTP binary streaming transport.
     * "http-binary" - The Client is using HTTP binary transport.
     * "http-base64" - The Client is using HTTP base64 transport.
     * </pre>
     *
     */
    webRxProtocol?: string;
    /**
     * The number of web transport requests received from the Client (HTTP only). Not available for WebSockets.
     */
    webRxRequestCount?: number;
    /**
     * The number of web transport responses transmitted to the Client on the receive connection (HTTP only). Not available for WebSockets.
     */
    webRxResponseCount?: number;
    /**
     * The TCP state of the receive connection from the Client. When fully operational, should be: established. See RFC 793 for further details. The allowed values and their meaning are:
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
    webRxTcpState?: string;
    /**
     * The description of the TLS cipher received from the Client, which may include cipher name, key exchange and encryption algorithms.
     */
    webRxTlsCipherDescription?: string;
    /**
     * The version of TLS used during reception from the Client.
     */
    webRxTlsVersion?: string;
    /**
     * The identifier (ID) of the web transport session for the Client.
     */
    webSessionId?: string;
    /**
     * The amount of web transport messages transmitted to the Client, in bytes (B).
     */
    webTxByteCount?: number;
    /**
     * The type of encoding used during transmission to the Client. The allowed values and their meaning are:
     *
     * <pre>
     * "binary" - The Client is using binary encoding.
     * "base64" - The Client is using base64 encoding.
     * "illegal" - The Client is using an illegal encoding type.
     * </pre>
     *
     */
    webTxEncoding?: string;
    /**
     * The number of web transport messages transmitted to the Client.
     */
    webTxMsgCount?: number;
    /**
     * The type of web transport used during transmission to the Client. The allowed values and their meaning are:
     *
     * <pre>
     * "ws-binary" - The Client is using WebSocket binary transport.
     * "http-binary-streaming" - The Client is using HTTP binary streaming transport.
     * "http-binary" - The Client is using HTTP binary transport.
     * "http-base64" - The Client is using HTTP base64 transport.
     * </pre>
     *
     */
    webTxProtocol?: string;
    /**
     * The number of web transport requests transmitted to the Client (HTTP only). Not available for WebSockets.
     */
    webTxRequestCount?: number;
    /**
     * The number of web transport responses received from the Client on the transmit connection (HTTP only). Not available for WebSockets.
     */
    webTxResponseCount?: number;
    /**
     * The TCP state of the transmit connection to the Client. When fully operational, should be: established. See RFC 793 for further details. The allowed values and their meaning are:
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
    webTxTcpState?: string;
    /**
     * The description of the TLS cipher transmitted to the Client, which may include cipher name, key exchange and encryption algorithms.
     */
    webTxTlsCipherDescription?: string;
    /**
     * The version of TLS used during transmission to the Client.
     */
    webTxTlsVersion?: string;
}

export namespace MsgVpnClient {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClient';


}
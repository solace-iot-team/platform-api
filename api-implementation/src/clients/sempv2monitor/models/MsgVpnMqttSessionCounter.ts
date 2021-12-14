/* eslint-disable */


/**
 * The counters for the MQTT Session. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpnMqttSession object.
 */
export type MsgVpnMqttSessionCounter = {
    /**
     * The number of MQTT connect acknowledgment (CONNACK) refused response packets transmitted to the Client. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttConnackErrorTxCount?: number;
    /**
     * The number of MQTT connect acknowledgment (CONNACK) accepted response packets transmitted to the Client. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttConnackTxCount?: number;
    /**
     * The number of MQTT connect (CONNECT) request packets received from the Client. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttConnectRxCount?: number;
    /**
     * The number of MQTT disconnect (DISCONNECT) request packets received from the Client. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttDisconnectRxCount?: number;
    /**
     * The number of MQTT publish complete (PUBCOMP) packets transmitted to the Client in response to a PUBREL packet. These packets are the fourth and final packet of a QoS 2 protocol exchange. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPubcompTxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 0 message delivery. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPublishQos0RxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets transmitted to the Client for QoS 0 message delivery. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPublishQos0TxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 1 message delivery. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPublishQos1RxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets transmitted to the Client for QoS 1 message delivery. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPublishQos1TxCount?: number;
    /**
     * The number of MQTT publish message (PUBLISH) request packets received from the Client for QoS 2 message delivery. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPublishQos2RxCount?: number;
    /**
     * The number of MQTT publish received (PUBREC) packets transmitted to the Client in response to a PUBLISH packet with QoS 2. These packets are the second packet of a QoS 2 protocol exchange. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPubrecTxCount?: number;
    /**
     * The number of MQTT publish release (PUBREL) packets received from the Client in response to a PUBREC packet. These packets are the third packet of a QoS 2 protocol exchange. Deprecated since 2.13. This attribute has been moved to the MsgVpnMqttSession object.
     */
    mqttPubrelRxCount?: number;
}

export namespace MsgVpnMqttSessionCounter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionCounter';


}
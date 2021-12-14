/* eslint-disable */


export type MsgVpnMqttSessionSubscription = {
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
    mqttSessionVirtualRouter?: MsgVpnMqttSessionSubscription.mqttSessionVirtualRouter;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The quality of service (QoS) for the MQTT Session subscription.
     */
    subscriptionQos?: number;
    /**
     * The MQTT subscription topic.
     */
    subscriptionTopic?: string;
}

export namespace MsgVpnMqttSessionSubscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionSubscription';

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


}
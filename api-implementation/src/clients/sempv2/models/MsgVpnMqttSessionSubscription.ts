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
     * "auto" - The MQTT Session is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     *
     */
    mqttSessionVirtualRouter?: MsgVpnMqttSessionSubscription.mqttSessionVirtualRouter;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The quality of service (QoS) for the subscription as either 0 (deliver at most once) or 1 (deliver at least once). QoS 2 is not supported, but QoS 2 messages attracted by QoS 0 or QoS 1 subscriptions are accepted and delivered accordingly. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `0`.
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
     * "auto" - The MQTT Session is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     *
     */
    export enum mqttSessionVirtualRouter {
        PRIMARY = 'primary',
        BACKUP = 'backup',
        AUTO = 'auto',
    }


}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnMqttSession {
    /**
     * Enable or disable the MQTT Session. When disabled, the client is disconnected, new messages matching QoS 0 subscriptions are discarded, and new messages matching QoS 1 subscriptions are stored for future delivery. The default value is `false`.
     */
    enabled?: boolean;
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
    mqttSessionVirtualRouter?: MsgVpnMqttSession.mqttSessionVirtualRouter;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The owner of the MQTT Session. For externally-created sessions this defaults to the Client Username of the connecting client. For management-created sessions this defaults to empty. The default value is `""`.
     */
    owner?: string;
}

export namespace MsgVpnMqttSession {

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

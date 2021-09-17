/* eslint-disable */


export type MsgVpnMqttSessionLinks = {
    /**
     * The URI of this MQTT Session's collection of Subscription objects.
     */
    subscriptionsUri?: string;
    /**
     * The URI of this MQTT Session object.
     */
    uri?: string;
}

export namespace MsgVpnMqttSessionLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionLinks';


}
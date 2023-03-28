/* eslint-disable */


export type GatewayMessagingService = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    messagingServiceId?: string;
    eventApiProductVersionId?: string;
    supportedProtocols?: Array<'smfc' | 'smf' | 'smfs' | 'amqp' | 'amqps' | 'mqtt' | 'mqtts' | 'mqttws' | 'mqttwss' | 'SECUREMQTT' | 'SECUREMQTTWS' | 'rest' | 'rests'>;
    type?: string;
}

export namespace GatewayMessagingService {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GatewayMessagingService';


}
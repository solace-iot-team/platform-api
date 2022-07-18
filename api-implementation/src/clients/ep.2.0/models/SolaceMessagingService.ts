/* eslint-disable */


export type SolaceMessagingService = {
    /**
     * Id value of the object
     */
    readonly id?: string;
    /**
     * Value for allowed supported protocols
     */
    supportedProtocols?: Array<'amqp' | 'amqps' | 'ssh' | 'semps' | 'mqtt' | 'mqtts' | 'mqttwss' | 'mqttws' | 'rest' | 'rests' | 'smfc' | 'smf' | 'smfs' | 'web' | 'webs'>;
    readonly environmentId?: string;
    readonly environmentName?: string;
    readonly eventMeshId?: string;
    readonly eventMeshName?: string;
    solaceCloudMessagingServiceId?: string;
    readonly type: string;
}

export namespace SolaceMessagingService {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceMessagingService';


}
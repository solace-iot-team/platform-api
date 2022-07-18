/* eslint-disable */


import type { BaseAllowedProtocol } from './BaseAllowedProtocol';
import type { SolaceMessagingService } from './SolaceMessagingService';

export type BaseMessagingServiceDTO = (SolaceMessagingService | {
    /**
     * Id value of the object
     */
    readonly id?: string,
    /**
     * Value for allowed supported protocols
     */
    supportedProtocols?: Array<BaseAllowedProtocol>,
    readonly environmentId?: string,
    readonly environmentName?: string,
    readonly eventMeshId?: string,
    readonly eventMeshName?: string,
    type?: string,
});

export namespace BaseMessagingServiceDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BaseMessagingServiceDTO';


}
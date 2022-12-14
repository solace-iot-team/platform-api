/* eslint-disable */


import type { GatewayMessagingService } from './GatewayMessagingService';

export type GatewayMessagingServiceResponse = {
    data?: GatewayMessagingService;
    meta?: Record<string, any>;
}

export namespace GatewayMessagingServiceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GatewayMessagingServiceResponse';


}
/* eslint-disable */


import type { EnvironmentMessagingService } from './EnvironmentMessagingService';

export type SolaceMessagingServiceResponse = {
    data?: EnvironmentMessagingService;
    meta?: Record<string, any>;
}

export namespace SolaceMessagingServiceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceMessagingServiceResponse';


}
/* eslint-disable */


import type { EnvironmentMessagingService } from './EnvironmentMessagingService';

export type SolaceMessagingServicesResponse = {
    data?: Array<EnvironmentMessagingService>;
    meta?: Record<string, any>;
}

export namespace SolaceMessagingServicesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceMessagingServicesResponse';


}
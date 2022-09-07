/* eslint-disable */


import type { BaseMessagingServiceDTO } from './BaseMessagingServiceDTO';

/**
 * Solace Messaging Service
 */
export type SolaceMessagingService = (BaseMessagingServiceDTO & {
    solaceCloudMessagingServiceId?: string,
});

export namespace SolaceMessagingService {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceMessagingService';


}
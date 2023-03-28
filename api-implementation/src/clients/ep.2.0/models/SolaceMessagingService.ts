/* eslint-disable */


import type { BaseMessagingServiceDTO } from './BaseMessagingServiceDTO';

/**
 * Solace Messaging Services
 */
export type SolaceMessagingService = (BaseMessagingServiceDTO & {
    solaceCloudMessagingServiceId?: string,
    /**
     * The type of payload
     */
    readonly type: string,
});

export namespace SolaceMessagingService {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceMessagingService';


}
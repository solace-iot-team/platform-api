/* eslint-disable */


import type { MessagingService } from './MessagingService';

export type MessagingServiceResponse = {
    data?: MessagingService;
    meta?: Record<string, any>;
}

export namespace MessagingServiceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceResponse';


}
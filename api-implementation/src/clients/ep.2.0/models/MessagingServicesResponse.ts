/* eslint-disable */


import type { MessagingService } from './MessagingService';
import type { meta } from './meta';

export type MessagingServicesResponse = {
    data?: Array<MessagingService>;
    meta?: meta;
}

export namespace MessagingServicesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServicesResponse';


}
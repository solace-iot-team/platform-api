/* eslint-disable */


import type { MessagingServiceOperation } from './MessagingServiceOperation';

export type MessagingServiceOperationResponse = {
    data?: MessagingServiceOperation;
    meta?: Record<string, any>;
}

export namespace MessagingServiceOperationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceOperationResponse';


}
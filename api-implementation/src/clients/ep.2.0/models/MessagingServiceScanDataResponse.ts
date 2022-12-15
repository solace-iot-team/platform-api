/* eslint-disable */


import type { MessagingServiceScanData } from './MessagingServiceScanData';

export type MessagingServiceScanDataResponse = {
    data?: MessagingServiceScanData;
    meta?: Record<string, any>;
}

export namespace MessagingServiceScanDataResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScanDataResponse';


}
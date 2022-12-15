/* eslint-disable */


import type { MessagingServiceScan } from './MessagingServiceScan';

export type MessagingServiceScanResponse = {
    data?: MessagingServiceScan;
    meta?: Record<string, any>;
}

export namespace MessagingServiceScanResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScanResponse';


}
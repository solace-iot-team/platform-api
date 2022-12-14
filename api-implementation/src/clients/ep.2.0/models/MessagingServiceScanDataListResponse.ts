/* eslint-disable */


import type { MessagingServiceScanData } from './MessagingServiceScanData';
import type { meta } from './meta';

export type MessagingServiceScanDataListResponse = {
    data?: Array<MessagingServiceScanData>;
    meta?: meta;
}

export namespace MessagingServiceScanDataListResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScanDataListResponse';


}
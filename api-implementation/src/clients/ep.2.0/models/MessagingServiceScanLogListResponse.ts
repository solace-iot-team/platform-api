/* eslint-disable */


import type { MessagingServiceScanLog } from './MessagingServiceScanLog';
import type { meta } from './meta';

export type MessagingServiceScanLogListResponse = {
    data?: Array<MessagingServiceScanLog>;
    meta?: meta;
}

export namespace MessagingServiceScanLogListResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScanLogListResponse';


}
/* eslint-disable */


import type { MessagingServiceScan } from './MessagingServiceScan';
import type { meta } from './meta';

export type MessagingServiceScansResponse = {
    data?: Array<MessagingServiceScan>;
    meta?: meta;
}

export namespace MessagingServiceScansResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScansResponse';


}
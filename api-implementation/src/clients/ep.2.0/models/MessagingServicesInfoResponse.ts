/* eslint-disable */


import type { MessagingServiceInfoDTO } from './MessagingServiceInfoDTO';
import type { meta } from './meta';

export type MessagingServicesInfoResponse = {
    data?: Array<MessagingServiceInfoDTO>;
    meta?: meta;
}

export namespace MessagingServicesInfoResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServicesInfoResponse';


}
/* eslint-disable */


import type { MessagingServiceAssociationDTO } from './MessagingServiceAssociationDTO';

export type MessagingServiceAssociationResponse = {
    data?: MessagingServiceAssociationDTO;
    meta?: Record<string, any>;
}

export namespace MessagingServiceAssociationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceAssociationResponse';


}
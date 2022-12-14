/* eslint-disable */


import type { ApplicationRegistration } from './ApplicationRegistration';

export type ApplicationRegistrationsResponse = {
    data?: Array<ApplicationRegistration>;
    meta?: Record<string, any>;
}

export namespace ApplicationRegistrationsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationRegistrationsResponse';


}
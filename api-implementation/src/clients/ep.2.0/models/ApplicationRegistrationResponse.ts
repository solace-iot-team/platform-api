/* eslint-disable */


import type { ApplicationRegistration } from './ApplicationRegistration';

export type ApplicationRegistrationResponse = {
    data?: ApplicationRegistration;
    meta?: Record<string, any>;
}

export namespace ApplicationRegistrationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationRegistrationResponse';


}
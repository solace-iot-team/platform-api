/* eslint-disable */


import type { EventApiProductRegistration } from './EventApiProductRegistration';

export type ApplicationRegistrationResponse = {
    data?: EventApiProductRegistration;
    meta?: Record<string, any>;
}

export namespace ApplicationRegistrationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationRegistrationResponse';


}
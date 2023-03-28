/* eslint-disable */


import type { EventApiProductRegistration } from './EventApiProductRegistration';

export type EventApiProductRegistrationResponse = {
    data?: EventApiProductRegistration;
    meta?: Record<string, any>;
}

export namespace EventApiProductRegistrationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductRegistrationResponse';


}
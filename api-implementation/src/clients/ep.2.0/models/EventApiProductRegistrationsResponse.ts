/* eslint-disable */


import type { EventApiProductRegistration } from './EventApiProductRegistration';

export type EventApiProductRegistrationsResponse = {
    data?: Array<EventApiProductRegistration>;
    meta?: Record<string, any>;
}

export namespace EventApiProductRegistrationsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductRegistrationsResponse';


}
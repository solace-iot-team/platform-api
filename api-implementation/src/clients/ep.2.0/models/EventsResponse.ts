/* eslint-disable */


import type { Event } from './Event';

export type EventsResponse = {
    data?: Array<Event>;
    meta?: Record<string, any>;
}

export namespace EventsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventsResponse';


}
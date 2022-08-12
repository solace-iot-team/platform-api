/* eslint-disable */


import type { Event } from './Event';

export type EventResponse = {
    data?: Event;
    meta?: Record<string, any>;
}

export namespace EventResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventResponse';


}
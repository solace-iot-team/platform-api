/* eslint-disable */


import type { Event } from './Event';
import type { meta } from './meta';

export type EventsResponse = {
    data?: Array<Event>;
    meta?: meta;
}

export namespace EventsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventsResponse';


}
/* eslint-disable */


import type { EventApiVersion } from './EventApiVersion';

export type EventApiVersionsResponse = {
    data?: Array<EventApiVersion>;
    meta?: Record<string, any>;
}

export namespace EventApiVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiVersionsResponse';


}
/* eslint-disable */


import type { EventVersion } from './EventVersion';

export type EventVersionsResponse = {
    data?: Array<EventVersion>;
    meta?: Record<string, any>;
}

export namespace EventVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventVersionsResponse';


}
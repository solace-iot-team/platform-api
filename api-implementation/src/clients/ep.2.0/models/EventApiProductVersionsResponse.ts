/* eslint-disable */


import type { EventApiProductVersion } from './EventApiProductVersion';

export type EventApiProductVersionsResponse = {
    data?: Array<EventApiProductVersion>;
    meta?: Record<string, any>;
}

export namespace EventApiProductVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductVersionsResponse';


}
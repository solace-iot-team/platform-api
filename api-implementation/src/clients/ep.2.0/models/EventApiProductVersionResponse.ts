/* eslint-disable */


import type { EventApiProductVersion } from './EventApiProductVersion';

export type EventApiProductVersionResponse = {
    data?: EventApiProductVersion;
    meta?: Record<string, any>;
}

export namespace EventApiProductVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductVersionResponse';


}
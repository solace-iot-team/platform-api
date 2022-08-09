/* eslint-disable */


import type { EventApiVersion } from './EventApiVersion';

export type EventApiVersionResponse = {
    data?: EventApiVersion;
    meta?: Record<string, any>;
}

export namespace EventApiVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiVersionResponse';


}
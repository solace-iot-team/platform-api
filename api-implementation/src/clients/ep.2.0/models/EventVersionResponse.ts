/* eslint-disable */


import type { EventVersion } from './EventVersion';

export type EventVersionResponse = {
    data?: EventVersion;
    meta?: Record<string, any>;
}

export namespace EventVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventVersionResponse';


}
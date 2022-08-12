/* eslint-disable */


import type { EventApi } from './EventApi';

export type EventApiResponse = {
    data?: EventApi;
    meta?: Record<string, any>;
}

export namespace EventApiResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiResponse';


}
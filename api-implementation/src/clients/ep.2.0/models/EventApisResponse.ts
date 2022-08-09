/* eslint-disable */


import type { EventApi } from './EventApi';

export type EventApisResponse = {
    data?: Array<EventApi>;
    meta?: Record<string, any>;
}

export namespace EventApisResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApisResponse';


}
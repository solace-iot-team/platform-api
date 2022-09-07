/* eslint-disable */


import type { EventApi } from './EventApi';
import type { meta } from './meta';

export type EventApisResponse = {
    data?: Array<EventApi>;
    meta?: meta;
}

export namespace EventApisResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApisResponse';


}
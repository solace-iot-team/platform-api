/* eslint-disable */


import type { EventApiVersion } from './EventApiVersion';
import type { meta } from './meta';

export type EventApiVersionsResponse = {
    data?: Array<EventApiVersion>;
    meta?: meta;
}

export namespace EventApiVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiVersionsResponse';


}
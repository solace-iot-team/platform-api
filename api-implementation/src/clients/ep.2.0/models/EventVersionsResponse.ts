/* eslint-disable */


import type { EventVersion } from './EventVersion';
import type { meta } from './meta';

export type EventVersionsResponse = {
    data?: Array<EventVersion>;
    meta?: meta;
}

export namespace EventVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventVersionsResponse';


}
/* eslint-disable */


import type { EventApiProductVersion } from './EventApiProductVersion';
import type { meta } from './meta';

export type EventApiProductVersionsResponse = {
    data?: Array<EventApiProductVersion>;
    meta?: meta;
}

export namespace EventApiProductVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductVersionsResponse';


}
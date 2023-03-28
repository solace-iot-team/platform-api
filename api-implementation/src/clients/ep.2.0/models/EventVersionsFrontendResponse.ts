/* eslint-disable */


import type { EventVersionFrontend } from './EventVersionFrontend';
import type { meta } from './meta';

export type EventVersionsFrontendResponse = {
    data?: Array<EventVersionFrontend>;
    meta?: meta;
}

export namespace EventVersionsFrontendResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventVersionsFrontendResponse';


}
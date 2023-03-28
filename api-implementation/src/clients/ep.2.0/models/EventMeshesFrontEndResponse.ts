/* eslint-disable */


import type { EventMeshFrontEndDTO } from './EventMeshFrontEndDTO';

export type EventMeshesFrontEndResponse = {
    data?: Array<EventMeshFrontEndDTO>;
    meta?: Record<string, any>;
}

export namespace EventMeshesFrontEndResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMeshesFrontEndResponse';


}
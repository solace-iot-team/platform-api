/* eslint-disable */


import type { EventMeshFrontEndDTO } from './EventMeshFrontEndDTO';

export type EventMeshFrontEndResponse = {
    data?: EventMeshFrontEndDTO;
    meta?: Record<string, any>;
}

export namespace EventMeshFrontEndResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMeshFrontEndResponse';


}
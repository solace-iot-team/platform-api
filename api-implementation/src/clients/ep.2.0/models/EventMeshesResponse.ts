/* eslint-disable */


import type { EventMesh } from './EventMesh';

export type EventMeshesResponse = {
    data?: Array<EventMesh>;
    meta?: Record<string, any>;
}

export namespace EventMeshesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMeshesResponse';


}
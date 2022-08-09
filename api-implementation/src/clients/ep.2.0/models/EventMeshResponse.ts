/* eslint-disable */


import type { EventMesh } from './EventMesh';

export type EventMeshResponse = {
    data?: EventMesh;
    meta?: Record<string, any>;
}

export namespace EventMeshResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMeshResponse';


}
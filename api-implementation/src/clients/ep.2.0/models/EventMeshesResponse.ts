/* eslint-disable */


import type { EventMesh } from './EventMesh';
import type { meta } from './meta';

export type EventMeshesResponse = {
    data?: Array<EventMesh>;
    meta?: meta;
}

export namespace EventMeshesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMeshesResponse';


}
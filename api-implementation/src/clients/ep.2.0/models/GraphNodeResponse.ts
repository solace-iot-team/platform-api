/* eslint-disable */


import type { GraphNodeDTO } from './GraphNodeDTO';

export type GraphNodeResponse = {
    data?: GraphNodeDTO;
    meta?: Record<string, any>;
}

export namespace GraphNodeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphNodeResponse';


}
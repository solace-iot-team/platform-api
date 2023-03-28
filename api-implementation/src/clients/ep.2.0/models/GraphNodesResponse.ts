/* eslint-disable */


import type { GraphNodeWrapperDTO } from './GraphNodeWrapperDTO';

export type GraphNodesResponse = {
    data?: Array<GraphNodeWrapperDTO>;
    meta?: Record<string, any>;
}

export namespace GraphNodesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphNodesResponse';


}
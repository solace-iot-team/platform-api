/* eslint-disable */


import type { GraphEdgeDTO } from './GraphEdgeDTO';
import type { GraphNodeDTO } from './GraphNodeDTO';

export type GraphNodeWrapperDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    node?: GraphNodeDTO;
    edges?: Array<GraphEdgeDTO>;
    id?: string;
    type?: string;
}

export namespace GraphNodeWrapperDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphNodeWrapperDTO';


}
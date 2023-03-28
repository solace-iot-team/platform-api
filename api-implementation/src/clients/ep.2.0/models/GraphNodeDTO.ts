/* eslint-disable */


import type { GraphNodePosition } from './GraphNodePosition';
import type { GraphNodeReferenceDTO } from './GraphNodeReferenceDTO';

export type GraphNodeDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    graphModelId?: string;
    displayName?: string;
    position?: GraphNodePosition;
    nodeType?: string;
    references?: Array<GraphNodeReferenceDTO>;
    type?: string;
}

export namespace GraphNodeDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphNodeDTO';


}
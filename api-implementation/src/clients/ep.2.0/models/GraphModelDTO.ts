/* eslint-disable */


import type { GraphNodeWrapperDTO } from './GraphNodeWrapperDTO';

export type GraphModelDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    orgId?: string;
    name?: string;
    graphType?: string;
    context?: string;
    contextId?: string;
    nodes?: Array<GraphNodeWrapperDTO>;
    type?: string;
}

export namespace GraphModelDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphModelDTO';


}
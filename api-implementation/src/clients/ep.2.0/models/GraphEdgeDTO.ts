/* eslint-disable */


export type GraphEdgeDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    sourceId?: string;
    destinationId?: string;
    type?: string;
}

export namespace GraphEdgeDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphEdgeDTO';


}
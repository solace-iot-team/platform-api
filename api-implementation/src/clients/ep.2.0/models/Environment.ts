/* eslint-disable */


export type Environment = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name?: string;
    description?: string;
    revision?: number;
    numberOfEventMeshes?: number;
    readonly type?: string;
}

export namespace Environment {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Environment';


}
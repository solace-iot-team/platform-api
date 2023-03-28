/* eslint-disable */


export type EventMeshFrontEndDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    environmentName?: string;
    id?: string;
    name?: string;
    environmentId?: string;
    description?: string;
    brokerType?: string;
    applicationVersionIds?: Array<string>;
    referencedByMessagingServiceIds?: Array<string>;
    type?: string;
}

export namespace EventMeshFrontEndDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMeshFrontEndDTO';


}
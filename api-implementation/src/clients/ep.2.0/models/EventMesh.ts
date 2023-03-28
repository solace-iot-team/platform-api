/* eslint-disable */


export type EventMesh = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The name of the event mesh.
     */
    name?: string;
    /**
     * The environmentId of the Event Mesh
     */
    environmentId?: string;
    /**
     * The description of the event mesh.
     */
    description?: string;
    /**
     * The type of the broker used in the event mesh.
     */
    brokerType?: EventMesh.brokerType;
    /**
     * *Deprecation Date: 2022-12-01<br>Removal Date: 2023-12-01<br>Reason: Application versions must now be <a href="/cloud/reference/updateMessagingServiceAssociationForApplicationVersions">associated to messaging services</a> instead of modeled event meshes.*<br>
     */
    applicationVersionIds?: Array<string>;
    /**
     * The type of this payload, eventMesh.
     */
    readonly type?: string;
}

export namespace EventMesh {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventMesh';

    /**
     * The type of the broker used in the event mesh.
     */
    export enum brokerType {
        kafka = 'kafka',
        solace = 'solace',
    }


}
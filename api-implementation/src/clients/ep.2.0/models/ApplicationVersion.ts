/* eslint-disable */


import type { Consumer } from './Consumer';
import type { CustomAttribute } from './CustomAttribute';

export type ApplicationVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    applicationId: string;
    description?: string;
    version: string;
    displayName?: string;
    declaredProducedEventVersionIds?: Array<string>;
    declaredConsumedEventVersionIds?: Array<string>;
    declaredEventApiProductVersionIds?: Array<string>;
    readonly stateId?: string;
    /**
     * *deprecationDate: 2022-12-01T00:00:00.000Z<br>removalDate: 2023-12-01T00:00:00.000Z<br>reason: Application versions must now be <a href= https://openapi-v2.solace.cloud/#/Applications/updateMessagingServiceAssociationForApplicationVersions>associated to messaging services</a> instead of modeled event meshes.*<br>
     */
    eventMeshIds?: Array<string>;
    readonly consumers?: Array<Consumer>;
    customAttributes?: Array<CustomAttribute>;
    readonly messagingServiceIds?: Array<string>;
    type?: string;
}

export namespace ApplicationVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationVersion';


}
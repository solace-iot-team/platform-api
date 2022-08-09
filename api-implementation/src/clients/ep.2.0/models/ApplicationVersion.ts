/* eslint-disable */


import type { Consumer } from './Consumer';

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
    readonly stateId?: string;
    eventMeshIds?: Array<string>;
    readonly consumers?: Array<Consumer>;
    type?: string;
}

export namespace ApplicationVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationVersion';


}
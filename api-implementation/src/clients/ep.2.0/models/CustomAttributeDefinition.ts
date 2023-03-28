/* eslint-disable */


import type { AssociatedEntity } from './AssociatedEntity';

export type CustomAttributeDefinition = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    name?: string;
    valueType?: CustomAttributeDefinition.valueType;
    scope: CustomAttributeDefinition.scope;
    associatedEntityTypes?: Array<string>;
    associatedEntities?: Array<AssociatedEntity>;
    type?: string;
}

export namespace CustomAttributeDefinition {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttributeDefinition';

    export enum valueType {
        STRING = 'STRING',
        LONG_TEXT = 'LONG_TEXT',
    }

    export enum scope {
        organization = 'organization',
        applicationDomain = 'applicationDomain',
    }


}
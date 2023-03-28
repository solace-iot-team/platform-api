/* eslint-disable */


import type { AssociatedEntity } from './AssociatedEntity';

export type CustomAttributeFrontEndDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    name?: string;
    valueType?: CustomAttributeFrontEndDTO.valueType;
    scope: CustomAttributeFrontEndDTO.scope;
    associatedEntityTypes?: Array<string>;
    associatedEntities?: Array<AssociatedEntity>;
    valuesEntityTypes?: Array<string>;
    values?: Array<any>;
    type?: string;
}

export namespace CustomAttributeFrontEndDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttributeFrontEndDTO';

    export enum valueType {
        STRING = 'STRING',
        LONG_TEXT = 'LONG_TEXT',
    }

    export enum scope {
        organization = 'organization',
        applicationDomain = 'applicationDomain',
    }


}
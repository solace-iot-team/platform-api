/* eslint-disable */


import type { CustomAttribute } from './CustomAttribute';

export type SchemaVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    schemaId: string;
    description?: string;
    version: string;
    displayName?: string;
    content?: string;
    readonly referencedByEventVersionIds?: Array<string>;
    customAttributes?: Array<CustomAttribute>;
    readonly stateId?: string;
    readonly type?: string;
}

export namespace SchemaVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SchemaVersion';


}
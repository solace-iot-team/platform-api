/* eslint-disable */


export type CustomAttributeDefinition = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    name?: string;
    valueType?: CustomAttributeDefinition.valueType;
    associatedEntityTypes?: Array<string>;
    type?: string;
}

export namespace CustomAttributeDefinition {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttributeDefinition';

    export enum valueType {
        STRING = 'STRING',
    }


}
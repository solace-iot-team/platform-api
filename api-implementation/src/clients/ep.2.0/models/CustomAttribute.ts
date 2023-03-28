/* eslint-disable */


export type CustomAttribute = {
    customAttributeDefinitionId?: string;
    customAttributeDefinitionName?: string;
    value?: string;
}

export namespace CustomAttribute {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttribute';


}
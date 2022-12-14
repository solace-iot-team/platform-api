/* eslint-disable */


export type CustomAttribute = {
    customAttributeDefinitionId?: string;
    customAttributeDefinitionName?: string;
    /**
     * Valid Objects are Strings with characters: [a-zA-Z0-9_\-\. ]
     */
    value?: any;
}

export namespace CustomAttribute {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttribute';


}
/* eslint-disable */


import type { CustomAttributeDefinition } from './CustomAttributeDefinition';

export type CustomAttributeDefinitionResponse = {
    data?: CustomAttributeDefinition;
    meta?: Record<string, any>;
}

export namespace CustomAttributeDefinitionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttributeDefinitionResponse';


}
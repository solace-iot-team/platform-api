/* eslint-disable */


import type { CustomAttributeDefinition } from './CustomAttributeDefinition';
import type { meta } from './meta';

export type CustomAttributeDefinitionsResponse = {
    data?: Array<CustomAttributeDefinition>;
    meta?: meta;
}

export namespace CustomAttributeDefinitionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttributeDefinitionsResponse';


}
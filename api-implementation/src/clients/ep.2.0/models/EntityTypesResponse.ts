/* eslint-disable */


import type { EntityType } from './EntityType';
import type { meta } from './meta';

export type EntityTypesResponse = {
    data?: Array<EntityType>;
    meta?: meta;
}

export namespace EntityTypesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EntityTypesResponse';


}
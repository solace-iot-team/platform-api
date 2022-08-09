/* eslint-disable */


import type { SchemaObject } from './SchemaObject';

export type SchemasResponse = {
    data?: Array<SchemaObject>;
    meta?: Record<string, any>;
}

export namespace SchemasResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SchemasResponse';


}
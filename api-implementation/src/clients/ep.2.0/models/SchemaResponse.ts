/* eslint-disable */


import type { SchemaObject } from './SchemaObject';

export type SchemaResponse = {
    data?: SchemaObject;
    meta?: Record<string, any>;
}

export namespace SchemaResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SchemaResponse';


}
/* eslint-disable */


import type { SchemaVersion } from './SchemaVersion';

export type SchemaVersionResponse = {
    data?: SchemaVersion;
    meta?: Record<string, any>;
}

export namespace SchemaVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SchemaVersionResponse';


}
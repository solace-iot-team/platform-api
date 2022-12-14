/* eslint-disable */


import type { meta } from './meta';
import type { SchemaVersion } from './SchemaVersion';

export type SchemaVersionsResponse = {
    data?: Array<SchemaVersion>;
    meta?: meta;
}

export namespace SchemaVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SchemaVersionsResponse';


}
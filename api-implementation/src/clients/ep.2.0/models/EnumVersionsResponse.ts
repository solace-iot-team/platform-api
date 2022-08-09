/* eslint-disable */


import type { EnumVersion } from './EnumVersion';

export type EnumVersionsResponse = {
    data?: Array<EnumVersion>;
    meta?: Record<string, any>;
}

export namespace EnumVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnumVersionsResponse';


}
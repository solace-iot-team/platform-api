/* eslint-disable */


import type { EnumVersion } from './EnumVersion';

export type EnumVersionResponse = {
    data?: EnumVersion;
    meta?: Record<string, any>;
}

export namespace EnumVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnumVersionResponse';


}
/* eslint-disable */


import type { ApplicationVersion } from './ApplicationVersion';

export type ApplicationVersionResponse = {
    data?: ApplicationVersion;
    meta?: Record<string, any>;
}

export namespace ApplicationVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationVersionResponse';


}
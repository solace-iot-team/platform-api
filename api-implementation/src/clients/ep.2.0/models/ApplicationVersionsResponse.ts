/* eslint-disable */


import type { ApplicationVersion } from './ApplicationVersion';

export type ApplicationVersionsResponse = {
    data?: Array<ApplicationVersion>;
    meta?: Record<string, any>;
}

export namespace ApplicationVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationVersionsResponse';


}
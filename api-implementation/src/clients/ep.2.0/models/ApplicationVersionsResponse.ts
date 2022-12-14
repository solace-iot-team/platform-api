/* eslint-disable */


import type { ApplicationVersion } from './ApplicationVersion';
import type { meta } from './meta';

export type ApplicationVersionsResponse = {
    data?: Array<ApplicationVersion>;
    meta?: meta;
}

export namespace ApplicationVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationVersionsResponse';


}
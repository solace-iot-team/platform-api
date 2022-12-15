/* eslint-disable */


import type { Application } from './Application';
import type { meta } from './meta';

export type ApplicationsResponse = {
    data?: Array<Application>;
    meta?: meta;
}

export namespace ApplicationsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationsResponse';


}
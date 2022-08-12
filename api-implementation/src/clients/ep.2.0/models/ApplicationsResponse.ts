/* eslint-disable */


import type { Application } from './Application';

export type ApplicationsResponse = {
    data?: Array<Application>;
    meta?: Record<string, any>;
}

export namespace ApplicationsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationsResponse';


}
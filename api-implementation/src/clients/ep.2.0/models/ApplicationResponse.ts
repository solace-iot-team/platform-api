/* eslint-disable */


import type { Application } from './Application';

export type ApplicationResponse = {
    data?: Application;
    meta?: Record<string, any>;
}

export namespace ApplicationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationResponse';


}
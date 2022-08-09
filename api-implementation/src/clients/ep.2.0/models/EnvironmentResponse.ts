/* eslint-disable */


import type { Environment } from './Environment';

export type EnvironmentResponse = {
    data?: Environment;
    meta?: Record<string, any>;
}

export namespace EnvironmentResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnvironmentResponse';


}
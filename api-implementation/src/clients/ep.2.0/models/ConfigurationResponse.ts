/* eslint-disable */


import type { Configuration } from './Configuration';

export type ConfigurationResponse = {
    data?: Configuration;
    meta?: Record<string, any>;
}

export namespace ConfigurationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigurationResponse';


}
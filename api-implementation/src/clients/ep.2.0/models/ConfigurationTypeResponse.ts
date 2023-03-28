/* eslint-disable */


import type { ConfigurationType } from './ConfigurationType';

export type ConfigurationTypeResponse = {
    data?: ConfigurationType;
    meta?: Record<string, any>;
}

export namespace ConfigurationTypeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigurationTypeResponse';


}
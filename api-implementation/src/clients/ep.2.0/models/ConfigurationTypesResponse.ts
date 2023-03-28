/* eslint-disable */


import type { ConfigurationType } from './ConfigurationType';
import type { meta } from './meta';

export type ConfigurationTypesResponse = {
    data?: Array<ConfigurationType>;
    meta?: meta;
}

export namespace ConfigurationTypesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigurationTypesResponse';


}
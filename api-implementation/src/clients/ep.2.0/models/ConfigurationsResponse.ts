/* eslint-disable */


import type { Configuration } from './Configuration';
import type { meta } from './meta';

export type ConfigurationsResponse = {
    data?: Array<Configuration>;
    meta?: meta;
}

export namespace ConfigurationsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigurationsResponse';


}
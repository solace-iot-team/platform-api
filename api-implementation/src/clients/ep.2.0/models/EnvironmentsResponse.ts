/* eslint-disable */


import type { Environment } from './Environment';
import type { meta } from './meta';

export type EnvironmentsResponse = {
    data?: Array<Environment>;
    meta?: meta;
}

export namespace EnvironmentsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnvironmentsResponse';


}
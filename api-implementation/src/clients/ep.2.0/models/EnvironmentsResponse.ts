/* eslint-disable */


import type { Environment } from './Environment';

export type EnvironmentsResponse = {
    data?: Array<Environment>;
    meta?: Record<string, any>;
}

export namespace EnvironmentsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnvironmentsResponse';


}
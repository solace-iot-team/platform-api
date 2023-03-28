/* eslint-disable */


import type { GraphModelDTO } from './GraphModelDTO';

export type GraphModelResponse = {
    data?: GraphModelDTO;
    meta?: Record<string, any>;
}

export namespace GraphModelResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphModelResponse';


}
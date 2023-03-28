/* eslint-disable */


import type { GraphModelDTO } from './GraphModelDTO';

export type GraphModelsResponse = {
    data?: Array<GraphModelDTO>;
    meta?: Record<string, any>;
}

export namespace GraphModelsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'GraphModelsResponse';


}
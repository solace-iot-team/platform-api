/* eslint-disable */


import type { Consumer } from './Consumer';

export type ConsumersResponse = {
    data?: Array<Consumer>;
    meta?: Record<string, any>;
}

export namespace ConsumersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConsumersResponse';


}
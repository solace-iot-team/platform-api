/* eslint-disable */


import type { Consumer } from './Consumer';

export type ConsumerResponse = {
    data?: Consumer;
    meta?: Record<string, any>;
}

export namespace ConsumerResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConsumerResponse';


}
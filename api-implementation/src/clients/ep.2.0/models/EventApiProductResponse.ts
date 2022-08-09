/* eslint-disable */


import type { EventApiProduct } from './EventApiProduct';

export type EventApiProductResponse = {
    data?: EventApiProduct;
    meta?: Record<string, any>;
}

export namespace EventApiProductResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductResponse';


}
/* eslint-disable */


import type { EventApiProduct } from './EventApiProduct';

export type EventApiProductsResponse = {
    data?: Array<EventApiProduct>;
    meta?: Record<string, any>;
}

export namespace EventApiProductsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductsResponse';


}
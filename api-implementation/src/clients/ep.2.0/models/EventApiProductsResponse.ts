/* eslint-disable */


import type { EventApiProduct } from './EventApiProduct';
import type { meta } from './meta';

export type EventApiProductsResponse = {
    data?: Array<EventApiProduct>;
    meta?: meta;
}

export namespace EventApiProductsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductsResponse';


}
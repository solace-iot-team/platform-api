/* eslint-disable */


import type { Consumer } from './Consumer';
import type { meta } from './meta';

export type ConsumersResponse = {
    data?: Array<Consumer>;
    meta?: meta;
}

export namespace ConsumersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConsumersResponse';


}
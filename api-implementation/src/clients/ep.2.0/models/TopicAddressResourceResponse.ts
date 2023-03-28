/* eslint-disable */


import type { TopicAddressResourceDTO } from './TopicAddressResourceDTO';

export type TopicAddressResourceResponse = {
    data?: TopicAddressResourceDTO;
    meta?: Record<string, any>;
}

export namespace TopicAddressResourceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressResourceResponse';


}
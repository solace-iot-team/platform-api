/* eslint-disable */


import type { TopicAddressResourceDTO } from './TopicAddressResourceDTO';

export type TopicAddressResourcesResponse = {
    data?: Array<TopicAddressResourceDTO>;
    meta?: Record<string, any>;
}

export namespace TopicAddressResourcesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressResourcesResponse';


}
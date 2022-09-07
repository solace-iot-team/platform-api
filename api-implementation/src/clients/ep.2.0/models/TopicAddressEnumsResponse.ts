/* eslint-disable */


import type { TopicAddressEnum } from './TopicAddressEnum';

export type TopicAddressEnumsResponse = {
    data?: Array<TopicAddressEnum>;
    meta?: Record<string, any>;
}

export namespace TopicAddressEnumsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumsResponse';


}
/* eslint-disable */


import type { meta } from './meta';
import type { TopicAddressEnum } from './TopicAddressEnum';

export type TopicAddressEnumsResponse = {
    data?: Array<TopicAddressEnum>;
    meta?: meta;
}

export namespace TopicAddressEnumsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumsResponse';


}
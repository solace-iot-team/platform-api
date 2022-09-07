/* eslint-disable */


import type { TopicAddressEnum } from './TopicAddressEnum';

export type TopicAddressEnumResponse = {
    data?: TopicAddressEnum;
    meta?: Record<string, any>;
}

export namespace TopicAddressEnumResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumResponse';


}
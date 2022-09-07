/* eslint-disable */


import type { TopicAddressEnumVersion } from './TopicAddressEnumVersion';

export type TopicAddressEnumVersionsResponse = {
    data?: Array<TopicAddressEnumVersion>;
    meta?: Record<string, any>;
}

export namespace TopicAddressEnumVersionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumVersionsResponse';


}
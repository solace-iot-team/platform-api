/* eslint-disable */


import type { TopicAddressEnumVersion } from './TopicAddressEnumVersion';

export type TopicAddressEnumVersionResponse = {
    data?: TopicAddressEnumVersion;
    meta?: Record<string, any>;
}

export namespace TopicAddressEnumVersionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumVersionResponse';


}
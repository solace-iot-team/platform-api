/* eslint-disable */


import type { meta } from './meta';
import type { TopicDomain } from './TopicDomain';

export type TopicDomainsResponse = {
    data?: Array<TopicDomain>;
    meta?: meta;
}

export namespace TopicDomainsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicDomainsResponse';


}
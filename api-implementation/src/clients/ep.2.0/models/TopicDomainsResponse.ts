/* eslint-disable */


import type { TopicDomain } from './TopicDomain';

export type TopicDomainsResponse = {
    data?: Array<TopicDomain>;
    meta?: Record<string, any>;
}

export namespace TopicDomainsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicDomainsResponse';


}
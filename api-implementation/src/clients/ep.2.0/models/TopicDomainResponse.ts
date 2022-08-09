/* eslint-disable */


import type { TopicDomain } from './TopicDomain';

export type TopicDomainResponse = {
    data?: TopicDomain;
    meta?: Record<string, any>;
}

export namespace TopicDomainResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicDomainResponse';


}
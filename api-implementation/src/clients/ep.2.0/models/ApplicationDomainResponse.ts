/* eslint-disable */


import type { ApplicationDomain } from './ApplicationDomain';

export type ApplicationDomainResponse = {
    data?: ApplicationDomain;
    meta?: Record<string, any>;
}

export namespace ApplicationDomainResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationDomainResponse';


}
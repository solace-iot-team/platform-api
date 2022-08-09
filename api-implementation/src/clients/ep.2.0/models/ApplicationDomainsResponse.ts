/* eslint-disable */


import type { ApplicationDomain } from './ApplicationDomain';

export type ApplicationDomainsResponse = {
    data?: Array<ApplicationDomain>;
    meta?: Record<string, any>;
}

export namespace ApplicationDomainsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationDomainsResponse';


}
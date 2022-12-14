/* eslint-disable */


import type { ApplicationDomain } from './ApplicationDomain';
import type { meta } from './meta';

export type ApplicationDomainsResponse = {
    data?: Array<ApplicationDomain>;
    meta?: meta;
}

export namespace ApplicationDomainsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationDomainsResponse';


}
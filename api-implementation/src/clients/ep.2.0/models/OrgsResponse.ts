/* eslint-disable */


import type { OrgDTO } from './OrgDTO';

export type OrgsResponse = {
    data?: Array<OrgDTO>;
    meta?: Record<string, any>;
}

export namespace OrgsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OrgsResponse';


}
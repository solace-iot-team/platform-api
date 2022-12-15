/* eslint-disable */


import type { Audit } from './Audit';
import type { meta } from './meta';

export type AuditsResponse = {
    data?: Array<Audit>;
    meta?: meta;
}

export namespace AuditsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditsResponse';


}
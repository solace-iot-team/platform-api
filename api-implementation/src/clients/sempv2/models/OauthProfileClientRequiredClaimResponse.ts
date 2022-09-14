/* eslint-disable */


import type { OauthProfileClientRequiredClaim } from './OauthProfileClientRequiredClaim';
import type { OauthProfileClientRequiredClaimLinks } from './OauthProfileClientRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileClientRequiredClaimResponse = {
    data?: OauthProfileClientRequiredClaim;
    links?: OauthProfileClientRequiredClaimLinks;
    meta: SempMeta;
}

export namespace OauthProfileClientRequiredClaimResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientRequiredClaimResponse';


}
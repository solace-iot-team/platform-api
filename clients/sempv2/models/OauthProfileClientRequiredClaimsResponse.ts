/* eslint-disable */


import type { OauthProfileClientRequiredClaim } from './OauthProfileClientRequiredClaim';
import type { OauthProfileClientRequiredClaimLinks } from './OauthProfileClientRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileClientRequiredClaimsResponse = {
    data?: Array<OauthProfileClientRequiredClaim>;
    links?: Array<OauthProfileClientRequiredClaimLinks>;
    meta: SempMeta;
}

export namespace OauthProfileClientRequiredClaimsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientRequiredClaimsResponse';


}
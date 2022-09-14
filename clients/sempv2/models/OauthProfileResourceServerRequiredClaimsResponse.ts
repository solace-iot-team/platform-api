/* eslint-disable */


import type { OauthProfileResourceServerRequiredClaim } from './OauthProfileResourceServerRequiredClaim';
import type { OauthProfileResourceServerRequiredClaimLinks } from './OauthProfileResourceServerRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileResourceServerRequiredClaimsResponse = {
    data?: Array<OauthProfileResourceServerRequiredClaim>;
    links?: Array<OauthProfileResourceServerRequiredClaimLinks>;
    meta: SempMeta;
}

export namespace OauthProfileResourceServerRequiredClaimsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileResourceServerRequiredClaimsResponse';


}
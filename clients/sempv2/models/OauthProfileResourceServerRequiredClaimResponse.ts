/* eslint-disable */


import type { OauthProfileResourceServerRequiredClaim } from './OauthProfileResourceServerRequiredClaim';
import type { OauthProfileResourceServerRequiredClaimLinks } from './OauthProfileResourceServerRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileResourceServerRequiredClaimResponse = {
    data?: OauthProfileResourceServerRequiredClaim;
    links?: OauthProfileResourceServerRequiredClaimLinks;
    meta: SempMeta;
}

export namespace OauthProfileResourceServerRequiredClaimResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileResourceServerRequiredClaimResponse';


}
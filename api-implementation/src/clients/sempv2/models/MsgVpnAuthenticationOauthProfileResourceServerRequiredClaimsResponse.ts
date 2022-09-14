/* eslint-disable */


import type { MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim } from './MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim';
import type { MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimLinks } from './MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimsResponse = {
    data?: Array<MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim>;
    links?: Array<MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimsResponse';


}
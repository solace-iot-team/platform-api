/* eslint-disable */


import type { MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim } from './MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim';
import type { MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimLinks } from './MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimResponse = {
    data?: MsgVpnAuthenticationOauthProfileResourceServerRequiredClaim;
    links?: MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimLinks;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileResourceServerRequiredClaimResponse';


}
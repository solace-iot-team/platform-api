/* eslint-disable */


import type { MsgVpnAuthenticationOauthProfileClientRequiredClaim } from './MsgVpnAuthenticationOauthProfileClientRequiredClaim';
import type { MsgVpnAuthenticationOauthProfileClientRequiredClaimLinks } from './MsgVpnAuthenticationOauthProfileClientRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProfileClientRequiredClaimsResponse = {
    data?: Array<MsgVpnAuthenticationOauthProfileClientRequiredClaim>;
    links?: Array<MsgVpnAuthenticationOauthProfileClientRequiredClaimLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProfileClientRequiredClaimsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileClientRequiredClaimsResponse';


}
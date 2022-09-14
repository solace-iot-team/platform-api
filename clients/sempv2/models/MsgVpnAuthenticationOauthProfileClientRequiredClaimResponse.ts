/* eslint-disable */


import type { MsgVpnAuthenticationOauthProfileClientRequiredClaim } from './MsgVpnAuthenticationOauthProfileClientRequiredClaim';
import type { MsgVpnAuthenticationOauthProfileClientRequiredClaimLinks } from './MsgVpnAuthenticationOauthProfileClientRequiredClaimLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProfileClientRequiredClaimResponse = {
    data?: MsgVpnAuthenticationOauthProfileClientRequiredClaim;
    links?: MsgVpnAuthenticationOauthProfileClientRequiredClaimLinks;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProfileClientRequiredClaimResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileClientRequiredClaimResponse';


}
/* eslint-disable */


import type { MsgVpnAuthenticationOauthProfile } from './MsgVpnAuthenticationOauthProfile';
import type { MsgVpnAuthenticationOauthProfileLinks } from './MsgVpnAuthenticationOauthProfileLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProfileResponse = {
    data?: MsgVpnAuthenticationOauthProfile;
    links?: MsgVpnAuthenticationOauthProfileLinks;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProfileResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfileResponse';


}
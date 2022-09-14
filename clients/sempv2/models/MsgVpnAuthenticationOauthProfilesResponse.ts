/* eslint-disable */


import type { MsgVpnAuthenticationOauthProfile } from './MsgVpnAuthenticationOauthProfile';
import type { MsgVpnAuthenticationOauthProfileLinks } from './MsgVpnAuthenticationOauthProfileLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProfilesResponse = {
    data?: Array<MsgVpnAuthenticationOauthProfile>;
    links?: Array<MsgVpnAuthenticationOauthProfileLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProfilesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfilesResponse';


}
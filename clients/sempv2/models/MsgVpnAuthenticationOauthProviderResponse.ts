/* eslint-disable */


import type { MsgVpnAuthenticationOauthProvider } from './MsgVpnAuthenticationOauthProvider';
import type { MsgVpnAuthenticationOauthProviderLinks } from './MsgVpnAuthenticationOauthProviderLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProviderResponse = {
    data?: MsgVpnAuthenticationOauthProvider;
    links?: MsgVpnAuthenticationOauthProviderLinks;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProviderResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProviderResponse';


}
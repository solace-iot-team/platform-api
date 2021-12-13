/* eslint-disable */


import type { MsgVpnAuthenticationOauthProvider } from './MsgVpnAuthenticationOauthProvider';
import type { MsgVpnAuthenticationOauthProviderCollections } from './MsgVpnAuthenticationOauthProviderCollections';
import type { MsgVpnAuthenticationOauthProviderLinks } from './MsgVpnAuthenticationOauthProviderLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProvidersResponse = {
    collections?: Array<MsgVpnAuthenticationOauthProviderCollections>;
    data?: Array<MsgVpnAuthenticationOauthProvider>;
    links?: Array<MsgVpnAuthenticationOauthProviderLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAuthenticationOauthProvidersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProvidersResponse';


}
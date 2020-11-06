/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnAuthenticationOauthProvider } from './MsgVpnAuthenticationOauthProvider';
import type { MsgVpnAuthenticationOauthProviderLinks } from './MsgVpnAuthenticationOauthProviderLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnAuthenticationOauthProvidersResponse {
    data?: Array<MsgVpnAuthenticationOauthProvider>;
    links?: Array<MsgVpnAuthenticationOauthProviderLinks>;
    meta: SempMeta;
}

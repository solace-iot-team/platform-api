/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnAuthenticationOauthProvider } from './MsgVpnAuthenticationOauthProvider';
import type { MsgVpnAuthenticationOauthProviderLinks } from './MsgVpnAuthenticationOauthProviderLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthenticationOauthProviderResponse = {
    data?: MsgVpnAuthenticationOauthProvider;
    links?: MsgVpnAuthenticationOauthProviderLinks;
    meta: SempMeta;
}

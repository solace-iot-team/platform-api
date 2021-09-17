/* eslint-disable */


import type { MsgVpnBridgeTlsTrustedCommonName } from './MsgVpnBridgeTlsTrustedCommonName';
import type { MsgVpnBridgeTlsTrustedCommonNameLinks } from './MsgVpnBridgeTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeTlsTrustedCommonNameResponse = {
    data?: MsgVpnBridgeTlsTrustedCommonName;
    links?: MsgVpnBridgeTlsTrustedCommonNameLinks;
    meta: SempMeta;
}

export namespace MsgVpnBridgeTlsTrustedCommonNameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeTlsTrustedCommonNameResponse';


}
/* eslint-disable */


import type { MsgVpnBridgeTlsTrustedCommonName } from './MsgVpnBridgeTlsTrustedCommonName';
import type { MsgVpnBridgeTlsTrustedCommonNameLinks } from './MsgVpnBridgeTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeTlsTrustedCommonNamesResponse = {
    data?: Array<MsgVpnBridgeTlsTrustedCommonName>;
    links?: Array<MsgVpnBridgeTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

export namespace MsgVpnBridgeTlsTrustedCommonNamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeTlsTrustedCommonNamesResponse';


}
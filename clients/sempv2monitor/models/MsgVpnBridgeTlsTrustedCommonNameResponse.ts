/* eslint-disable */


import type { MsgVpnBridgeTlsTrustedCommonName } from './MsgVpnBridgeTlsTrustedCommonName';
import type { MsgVpnBridgeTlsTrustedCommonNameCollections } from './MsgVpnBridgeTlsTrustedCommonNameCollections';
import type { MsgVpnBridgeTlsTrustedCommonNameLinks } from './MsgVpnBridgeTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeTlsTrustedCommonNameResponse = {
    collections?: MsgVpnBridgeTlsTrustedCommonNameCollections;
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
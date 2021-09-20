/* eslint-disable */


import type { DmrClusterLinkTlsTrustedCommonName } from './DmrClusterLinkTlsTrustedCommonName';
import type { DmrClusterLinkTlsTrustedCommonNameLinks } from './DmrClusterLinkTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkTlsTrustedCommonNamesResponse = {
    data?: Array<DmrClusterLinkTlsTrustedCommonName>;
    links?: Array<DmrClusterLinkTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

export namespace DmrClusterLinkTlsTrustedCommonNamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkTlsTrustedCommonNamesResponse';


}
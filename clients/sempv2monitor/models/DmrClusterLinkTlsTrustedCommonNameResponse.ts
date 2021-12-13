/* eslint-disable */


import type { DmrClusterLinkTlsTrustedCommonName } from './DmrClusterLinkTlsTrustedCommonName';
import type { DmrClusterLinkTlsTrustedCommonNameCollections } from './DmrClusterLinkTlsTrustedCommonNameCollections';
import type { DmrClusterLinkTlsTrustedCommonNameLinks } from './DmrClusterLinkTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkTlsTrustedCommonNameResponse = {
    collections?: DmrClusterLinkTlsTrustedCommonNameCollections;
    data?: DmrClusterLinkTlsTrustedCommonName;
    links?: DmrClusterLinkTlsTrustedCommonNameLinks;
    meta: SempMeta;
}

export namespace DmrClusterLinkTlsTrustedCommonNameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkTlsTrustedCommonNameResponse';


}
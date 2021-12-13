/* eslint-disable */


import type { DmrClusterLinkRemoteAddress } from './DmrClusterLinkRemoteAddress';
import type { DmrClusterLinkRemoteAddressCollections } from './DmrClusterLinkRemoteAddressCollections';
import type { DmrClusterLinkRemoteAddressLinks } from './DmrClusterLinkRemoteAddressLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkRemoteAddressResponse = {
    collections?: DmrClusterLinkRemoteAddressCollections;
    data?: DmrClusterLinkRemoteAddress;
    links?: DmrClusterLinkRemoteAddressLinks;
    meta: SempMeta;
}

export namespace DmrClusterLinkRemoteAddressResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkRemoteAddressResponse';


}
/* eslint-disable */


import type { DmrClusterLinkRemoteAddress } from './DmrClusterLinkRemoteAddress';
import type { DmrClusterLinkRemoteAddressLinks } from './DmrClusterLinkRemoteAddressLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkRemoteAddressesResponse = {
    data?: Array<DmrClusterLinkRemoteAddress>;
    links?: Array<DmrClusterLinkRemoteAddressLinks>;
    meta: SempMeta;
}

export namespace DmrClusterLinkRemoteAddressesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkRemoteAddressesResponse';


}
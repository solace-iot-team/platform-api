/* eslint-disable */


import type { DmrClusterLinkAttribute } from './DmrClusterLinkAttribute';
import type { DmrClusterLinkAttributeLinks } from './DmrClusterLinkAttributeLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkAttributesResponse = {
    data?: Array<DmrClusterLinkAttribute>;
    links?: Array<DmrClusterLinkAttributeLinks>;
    meta: SempMeta;
}

export namespace DmrClusterLinkAttributesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkAttributesResponse';


}
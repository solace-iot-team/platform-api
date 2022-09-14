/* eslint-disable */


import type { DmrClusterLinkAttribute } from './DmrClusterLinkAttribute';
import type { DmrClusterLinkAttributeLinks } from './DmrClusterLinkAttributeLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkAttributeResponse = {
    data?: DmrClusterLinkAttribute;
    links?: DmrClusterLinkAttributeLinks;
    meta: SempMeta;
}

export namespace DmrClusterLinkAttributeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkAttributeResponse';


}
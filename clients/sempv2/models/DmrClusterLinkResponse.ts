/* eslint-disable */


import type { DmrClusterLink } from './DmrClusterLink';
import type { DmrClusterLinkLinks } from './DmrClusterLinkLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkResponse = {
    data?: DmrClusterLink;
    links?: DmrClusterLinkLinks;
    meta: SempMeta;
}

export namespace DmrClusterLinkResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkResponse';


}
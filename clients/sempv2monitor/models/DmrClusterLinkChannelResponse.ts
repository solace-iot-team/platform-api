/* eslint-disable */


import type { DmrClusterLinkChannel } from './DmrClusterLinkChannel';
import type { DmrClusterLinkChannelCollections } from './DmrClusterLinkChannelCollections';
import type { DmrClusterLinkChannelLinks } from './DmrClusterLinkChannelLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkChannelResponse = {
    collections?: DmrClusterLinkChannelCollections;
    data?: DmrClusterLinkChannel;
    links?: DmrClusterLinkChannelLinks;
    meta: SempMeta;
}

export namespace DmrClusterLinkChannelResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkChannelResponse';


}
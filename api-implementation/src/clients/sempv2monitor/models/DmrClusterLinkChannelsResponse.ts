/* eslint-disable */


import type { DmrClusterLinkChannel } from './DmrClusterLinkChannel';
import type { DmrClusterLinkChannelCollections } from './DmrClusterLinkChannelCollections';
import type { DmrClusterLinkChannelLinks } from './DmrClusterLinkChannelLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinkChannelsResponse = {
    collections?: Array<DmrClusterLinkChannelCollections>;
    data?: Array<DmrClusterLinkChannel>;
    links?: Array<DmrClusterLinkChannelLinks>;
    meta: SempMeta;
}

export namespace DmrClusterLinkChannelsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkChannelsResponse';


}
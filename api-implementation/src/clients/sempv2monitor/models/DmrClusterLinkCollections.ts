/* eslint-disable */


import type { DmrClusterLinkCollectionsChannels } from './DmrClusterLinkCollectionsChannels';
import type { DmrClusterLinkCollectionsRemoteaddresses } from './DmrClusterLinkCollectionsRemoteaddresses';
import type { DmrClusterLinkCollectionsTlstrustedcommonnames } from './DmrClusterLinkCollectionsTlstrustedcommonnames';

export type DmrClusterLinkCollections = {
    channels?: DmrClusterLinkCollectionsChannels;
    remoteAddresses?: DmrClusterLinkCollectionsRemoteaddresses;
    tlsTrustedCommonNames?: DmrClusterLinkCollectionsTlstrustedcommonnames;
}

export namespace DmrClusterLinkCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkCollections';


}
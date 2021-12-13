/* eslint-disable */


import type { DmrClusterCollectionsLinks } from './DmrClusterCollectionsLinks';
import type { DmrClusterCollectionsTopologyissues } from './DmrClusterCollectionsTopologyissues';

export type DmrClusterCollections = {
    links?: DmrClusterCollectionsLinks;
    topologyIssues?: DmrClusterCollectionsTopologyissues;
}

export namespace DmrClusterCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCollections';


}
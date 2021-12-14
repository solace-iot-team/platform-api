/* eslint-disable */


import type { DmrCluster } from './DmrCluster';
import type { DmrClusterCollections } from './DmrClusterCollections';
import type { DmrClusterLinks } from './DmrClusterLinks';
import type { SempMeta } from './SempMeta';

export type DmrClustersResponse = {
    collections?: Array<DmrClusterCollections>;
    data?: Array<DmrCluster>;
    links?: Array<DmrClusterLinks>;
    meta: SempMeta;
}

export namespace DmrClustersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClustersResponse';


}
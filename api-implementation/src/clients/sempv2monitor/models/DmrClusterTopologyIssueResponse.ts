/* eslint-disable */


import type { DmrClusterTopologyIssue } from './DmrClusterTopologyIssue';
import type { DmrClusterTopologyIssueCollections } from './DmrClusterTopologyIssueCollections';
import type { DmrClusterTopologyIssueLinks } from './DmrClusterTopologyIssueLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterTopologyIssueResponse = {
    collections?: DmrClusterTopologyIssueCollections;
    data?: DmrClusterTopologyIssue;
    links?: DmrClusterTopologyIssueLinks;
    meta: SempMeta;
}

export namespace DmrClusterTopologyIssueResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterTopologyIssueResponse';


}
/* eslint-disable */


import type { DmrClusterTopologyIssue } from './DmrClusterTopologyIssue';
import type { DmrClusterTopologyIssueCollections } from './DmrClusterTopologyIssueCollections';
import type { DmrClusterTopologyIssueLinks } from './DmrClusterTopologyIssueLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterTopologyIssuesResponse = {
    collections?: Array<DmrClusterTopologyIssueCollections>;
    data?: Array<DmrClusterTopologyIssue>;
    links?: Array<DmrClusterTopologyIssueLinks>;
    meta: SempMeta;
}

export namespace DmrClusterTopologyIssuesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterTopologyIssuesResponse';


}
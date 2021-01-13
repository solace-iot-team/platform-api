/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DmrCluster } from './DmrCluster';
import type { DmrClusterLinks } from './DmrClusterLinks';
import type { SempMeta } from './SempMeta';

export interface DmrClusterResponse {
    data?: DmrCluster;
    links?: DmrClusterLinks;
    meta: SempMeta;
}

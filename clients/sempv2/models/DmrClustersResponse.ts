/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DmrCluster } from './DmrCluster';
import type { DmrClusterLinks } from './DmrClusterLinks';
import type { SempMeta } from './SempMeta';

export interface DmrClustersResponse {
    data?: Array<DmrCluster>;
    links?: Array<DmrClusterLinks>;
    meta: SempMeta;
}

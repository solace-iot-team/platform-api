/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DmrCluster } from './DmrCluster';
import type { DmrClusterLinks } from './DmrClusterLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterResponse = {
    data?: DmrCluster;
    links?: DmrClusterLinks;
    meta: SempMeta;
}

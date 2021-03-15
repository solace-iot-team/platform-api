/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DmrClusterLink } from './DmrClusterLink';
import type { DmrClusterLinkLinks } from './DmrClusterLinkLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterLinksResponse = {
    data?: Array<DmrClusterLink>;
    links?: Array<DmrClusterLinkLinks>;
    meta: SempMeta;
}

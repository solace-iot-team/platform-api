/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DmrClusterLink } from './DmrClusterLink';
import type { DmrClusterLinkLinks } from './DmrClusterLinkLinks';
import type { SempMeta } from './SempMeta';

export interface DmrClusterLinkResponse {
    data?: DmrClusterLink;
    links?: DmrClusterLinkLinks;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DmrClusterLinkRemoteAddress } from './DmrClusterLinkRemoteAddress';
import type { DmrClusterLinkRemoteAddressLinks } from './DmrClusterLinkRemoteAddressLinks';
import type { SempMeta } from './SempMeta';

export interface DmrClusterLinkRemoteAddressesResponse {
    data?: Array<DmrClusterLinkRemoteAddress>;
    links?: Array<DmrClusterLinkRemoteAddressLinks>;
    meta: SempMeta;
}

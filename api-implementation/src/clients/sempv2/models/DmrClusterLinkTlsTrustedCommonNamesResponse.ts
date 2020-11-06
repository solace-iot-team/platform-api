/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DmrClusterLinkTlsTrustedCommonName } from './DmrClusterLinkTlsTrustedCommonName';
import type { DmrClusterLinkTlsTrustedCommonNameLinks } from './DmrClusterLinkTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export interface DmrClusterLinkTlsTrustedCommonNamesResponse {
    data?: Array<DmrClusterLinkTlsTrustedCommonName>;
    links?: Array<DmrClusterLinkTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

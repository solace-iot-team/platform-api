/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SempMeta } from './SempMeta';
import type { VirtualHostname } from './VirtualHostname';
import type { VirtualHostnameLinks } from './VirtualHostnameLinks';

export type VirtualHostnamesResponse = {
    data?: Array<VirtualHostname>;
    links?: Array<VirtualHostnameLinks>;
    meta: SempMeta;
}

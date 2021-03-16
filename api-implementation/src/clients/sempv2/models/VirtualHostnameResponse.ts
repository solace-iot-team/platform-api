/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SempMeta } from './SempMeta';
import type { VirtualHostname } from './VirtualHostname';
import type { VirtualHostnameLinks } from './VirtualHostnameLinks';

export type VirtualHostnameResponse = {
    data?: VirtualHostname;
    links?: VirtualHostnameLinks;
    meta: SempMeta;
}

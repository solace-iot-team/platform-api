/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CertAuthority } from './CertAuthority';
import type { CertAuthorityLinks } from './CertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type CertAuthoritiesResponse = {
    data?: Array<CertAuthority>;
    links?: Array<CertAuthorityLinks>;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DomainCertAuthority } from './DomainCertAuthority';
import type { DomainCertAuthorityLinks } from './DomainCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type DomainCertAuthorityResponse = {
    data?: DomainCertAuthority;
    links?: DomainCertAuthorityLinks;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DomainCertAuthority } from './DomainCertAuthority';
import type { DomainCertAuthorityLinks } from './DomainCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export interface DomainCertAuthoritiesResponse {
    data?: Array<DomainCertAuthority>;
    links?: Array<DomainCertAuthorityLinks>;
    meta: SempMeta;
}

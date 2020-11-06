/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertAuthorityOcspTlsTrustedCommonName } from './CertAuthorityOcspTlsTrustedCommonName';
import type { CertAuthorityOcspTlsTrustedCommonNameLinks } from './CertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export interface CertAuthorityOcspTlsTrustedCommonNameResponse {
    data?: CertAuthorityOcspTlsTrustedCommonName;
    links?: CertAuthorityOcspTlsTrustedCommonNameLinks;
    meta: SempMeta;
}

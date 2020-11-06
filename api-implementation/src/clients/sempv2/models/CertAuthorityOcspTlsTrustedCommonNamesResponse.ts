/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertAuthorityOcspTlsTrustedCommonName } from './CertAuthorityOcspTlsTrustedCommonName';
import type { CertAuthorityOcspTlsTrustedCommonNameLinks } from './CertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export interface CertAuthorityOcspTlsTrustedCommonNamesResponse {
    data?: Array<CertAuthorityOcspTlsTrustedCommonName>;
    links?: Array<CertAuthorityOcspTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

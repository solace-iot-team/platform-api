/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCertAuthorityOcspTlsTrustedCommonName } from './ClientCertAuthorityOcspTlsTrustedCommonName';
import type { ClientCertAuthorityOcspTlsTrustedCommonNameLinks } from './ClientCertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthorityOcspTlsTrustedCommonNamesResponse = {
    data?: Array<ClientCertAuthorityOcspTlsTrustedCommonName>;
    links?: Array<ClientCertAuthorityOcspTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

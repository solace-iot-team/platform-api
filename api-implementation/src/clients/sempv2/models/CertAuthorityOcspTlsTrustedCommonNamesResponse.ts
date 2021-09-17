/* eslint-disable */


import type { CertAuthorityOcspTlsTrustedCommonName } from './CertAuthorityOcspTlsTrustedCommonName';
import type { CertAuthorityOcspTlsTrustedCommonNameLinks } from './CertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type CertAuthorityOcspTlsTrustedCommonNamesResponse = {
    data?: Array<CertAuthorityOcspTlsTrustedCommonName>;
    links?: Array<CertAuthorityOcspTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

export namespace CertAuthorityOcspTlsTrustedCommonNamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthorityOcspTlsTrustedCommonNamesResponse';


}
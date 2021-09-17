/* eslint-disable */


import type { CertAuthorityOcspTlsTrustedCommonName } from './CertAuthorityOcspTlsTrustedCommonName';
import type { CertAuthorityOcspTlsTrustedCommonNameLinks } from './CertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type CertAuthorityOcspTlsTrustedCommonNameResponse = {
    data?: CertAuthorityOcspTlsTrustedCommonName;
    links?: CertAuthorityOcspTlsTrustedCommonNameLinks;
    meta: SempMeta;
}

export namespace CertAuthorityOcspTlsTrustedCommonNameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthorityOcspTlsTrustedCommonNameResponse';


}
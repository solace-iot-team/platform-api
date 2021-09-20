/* eslint-disable */


import type { ClientCertAuthorityOcspTlsTrustedCommonName } from './ClientCertAuthorityOcspTlsTrustedCommonName';
import type { ClientCertAuthorityOcspTlsTrustedCommonNameLinks } from './ClientCertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthorityOcspTlsTrustedCommonNameResponse = {
    data?: ClientCertAuthorityOcspTlsTrustedCommonName;
    links?: ClientCertAuthorityOcspTlsTrustedCommonNameLinks;
    meta: SempMeta;
}

export namespace ClientCertAuthorityOcspTlsTrustedCommonNameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthorityOcspTlsTrustedCommonNameResponse';


}
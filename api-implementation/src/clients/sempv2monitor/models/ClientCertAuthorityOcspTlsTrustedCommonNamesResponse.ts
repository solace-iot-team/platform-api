/* eslint-disable */


import type { ClientCertAuthorityOcspTlsTrustedCommonName } from './ClientCertAuthorityOcspTlsTrustedCommonName';
import type { ClientCertAuthorityOcspTlsTrustedCommonNameCollections } from './ClientCertAuthorityOcspTlsTrustedCommonNameCollections';
import type { ClientCertAuthorityOcspTlsTrustedCommonNameLinks } from './ClientCertAuthorityOcspTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthorityOcspTlsTrustedCommonNamesResponse = {
    collections?: Array<ClientCertAuthorityOcspTlsTrustedCommonNameCollections>;
    data?: Array<ClientCertAuthorityOcspTlsTrustedCommonName>;
    links?: Array<ClientCertAuthorityOcspTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

export namespace ClientCertAuthorityOcspTlsTrustedCommonNamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthorityOcspTlsTrustedCommonNamesResponse';


}
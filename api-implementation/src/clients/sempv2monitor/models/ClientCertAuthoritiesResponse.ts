/* eslint-disable */


import type { ClientCertAuthority } from './ClientCertAuthority';
import type { ClientCertAuthorityCollections } from './ClientCertAuthorityCollections';
import type { ClientCertAuthorityLinks } from './ClientCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthoritiesResponse = {
    collections?: Array<ClientCertAuthorityCollections>;
    data?: Array<ClientCertAuthority>;
    links?: Array<ClientCertAuthorityLinks>;
    meta: SempMeta;
}

export namespace ClientCertAuthoritiesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthoritiesResponse';


}
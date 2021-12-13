/* eslint-disable */


import type { ClientCertAuthority } from './ClientCertAuthority';
import type { ClientCertAuthorityCollections } from './ClientCertAuthorityCollections';
import type { ClientCertAuthorityLinks } from './ClientCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthorityResponse = {
    collections?: ClientCertAuthorityCollections;
    data?: ClientCertAuthority;
    links?: ClientCertAuthorityLinks;
    meta: SempMeta;
}

export namespace ClientCertAuthorityResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthorityResponse';


}
/* eslint-disable */


import type { CertAuthority } from './CertAuthority';
import type { CertAuthorityCollections } from './CertAuthorityCollections';
import type { CertAuthorityLinks } from './CertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type CertAuthoritiesResponse = {
    collections?: Array<CertAuthorityCollections>;
    data?: Array<CertAuthority>;
    links?: Array<CertAuthorityLinks>;
    meta: SempMeta;
}

export namespace CertAuthoritiesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthoritiesResponse';


}
/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { StandardDomainCertAuthority } from './StandardDomainCertAuthority';
import type { StandardDomainCertAuthorityCollections } from './StandardDomainCertAuthorityCollections';
import type { StandardDomainCertAuthorityLinks } from './StandardDomainCertAuthorityLinks';

export type StandardDomainCertAuthoritiesResponse = {
    collections?: Array<StandardDomainCertAuthorityCollections>;
    data?: Array<StandardDomainCertAuthority>;
    links?: Array<StandardDomainCertAuthorityLinks>;
    meta: SempMeta;
}

export namespace StandardDomainCertAuthoritiesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'StandardDomainCertAuthoritiesResponse';


}
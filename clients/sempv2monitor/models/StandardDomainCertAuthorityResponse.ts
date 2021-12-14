/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { StandardDomainCertAuthority } from './StandardDomainCertAuthority';
import type { StandardDomainCertAuthorityCollections } from './StandardDomainCertAuthorityCollections';
import type { StandardDomainCertAuthorityLinks } from './StandardDomainCertAuthorityLinks';

export type StandardDomainCertAuthorityResponse = {
    collections?: StandardDomainCertAuthorityCollections;
    data?: StandardDomainCertAuthority;
    links?: StandardDomainCertAuthorityLinks;
    meta: SempMeta;
}

export namespace StandardDomainCertAuthorityResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'StandardDomainCertAuthorityResponse';


}
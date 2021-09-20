/* eslint-disable */


import type { DomainCertAuthority } from './DomainCertAuthority';
import type { DomainCertAuthorityLinks } from './DomainCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type DomainCertAuthoritiesResponse = {
    data?: Array<DomainCertAuthority>;
    links?: Array<DomainCertAuthorityLinks>;
    meta: SempMeta;
}

export namespace DomainCertAuthoritiesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DomainCertAuthoritiesResponse';


}
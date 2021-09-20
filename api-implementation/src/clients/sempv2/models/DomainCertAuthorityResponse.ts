/* eslint-disable */


import type { DomainCertAuthority } from './DomainCertAuthority';
import type { DomainCertAuthorityLinks } from './DomainCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type DomainCertAuthorityResponse = {
    data?: DomainCertAuthority;
    links?: DomainCertAuthorityLinks;
    meta: SempMeta;
}

export namespace DomainCertAuthorityResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DomainCertAuthorityResponse';


}
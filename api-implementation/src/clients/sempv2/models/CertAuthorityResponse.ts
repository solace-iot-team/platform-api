/* eslint-disable */


import type { CertAuthority } from './CertAuthority';
import type { CertAuthorityLinks } from './CertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type CertAuthorityResponse = {
    data?: CertAuthority;
    links?: CertAuthorityLinks;
    meta: SempMeta;
}

export namespace CertAuthorityResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthorityResponse';


}
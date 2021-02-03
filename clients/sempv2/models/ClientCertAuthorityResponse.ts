/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientCertAuthority } from './ClientCertAuthority';
import type { ClientCertAuthorityLinks } from './ClientCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export interface ClientCertAuthorityResponse {
    data?: ClientCertAuthority;
    links?: ClientCertAuthorityLinks;
    meta: SempMeta;
}

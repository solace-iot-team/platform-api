/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCertAuthority } from './ClientCertAuthority';
import type { ClientCertAuthorityLinks } from './ClientCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthoritiesResponse = {
    data?: Array<ClientCertAuthority>;
    links?: Array<ClientCertAuthorityLinks>;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCertAuthority } from './ClientCertAuthority';
import type { ClientCertAuthorityLinks } from './ClientCertAuthorityLinks';
import type { SempMeta } from './SempMeta';

export type ClientCertAuthorityResponse = {
    data?: ClientCertAuthority;
    links?: ClientCertAuthorityLinks;
    meta: SempMeta;
}

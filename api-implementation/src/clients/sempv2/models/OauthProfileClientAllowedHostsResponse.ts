/* eslint-disable */


import type { OauthProfileClientAllowedHost } from './OauthProfileClientAllowedHost';
import type { OauthProfileClientAllowedHostLinks } from './OauthProfileClientAllowedHostLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileClientAllowedHostsResponse = {
    data?: Array<OauthProfileClientAllowedHost>;
    links?: Array<OauthProfileClientAllowedHostLinks>;
    meta: SempMeta;
}

export namespace OauthProfileClientAllowedHostsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientAllowedHostsResponse';


}
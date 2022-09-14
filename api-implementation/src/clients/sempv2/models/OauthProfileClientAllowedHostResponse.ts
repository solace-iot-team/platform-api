/* eslint-disable */


import type { OauthProfileClientAllowedHost } from './OauthProfileClientAllowedHost';
import type { OauthProfileClientAllowedHostLinks } from './OauthProfileClientAllowedHostLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileClientAllowedHostResponse = {
    data?: OauthProfileClientAllowedHost;
    links?: OauthProfileClientAllowedHostLinks;
    meta: SempMeta;
}

export namespace OauthProfileClientAllowedHostResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientAllowedHostResponse';


}
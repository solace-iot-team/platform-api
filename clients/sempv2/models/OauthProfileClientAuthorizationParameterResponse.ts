/* eslint-disable */


import type { OauthProfileClientAuthorizationParameter } from './OauthProfileClientAuthorizationParameter';
import type { OauthProfileClientAuthorizationParameterLinks } from './OauthProfileClientAuthorizationParameterLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileClientAuthorizationParameterResponse = {
    data?: OauthProfileClientAuthorizationParameter;
    links?: OauthProfileClientAuthorizationParameterLinks;
    meta: SempMeta;
}

export namespace OauthProfileClientAuthorizationParameterResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientAuthorizationParameterResponse';


}
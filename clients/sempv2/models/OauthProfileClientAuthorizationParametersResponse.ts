/* eslint-disable */


import type { OauthProfileClientAuthorizationParameter } from './OauthProfileClientAuthorizationParameter';
import type { OauthProfileClientAuthorizationParameterLinks } from './OauthProfileClientAuthorizationParameterLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileClientAuthorizationParametersResponse = {
    data?: Array<OauthProfileClientAuthorizationParameter>;
    links?: Array<OauthProfileClientAuthorizationParameterLinks>;
    meta: SempMeta;
}

export namespace OauthProfileClientAuthorizationParametersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileClientAuthorizationParametersResponse';


}
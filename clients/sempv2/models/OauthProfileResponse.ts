/* eslint-disable */


import type { OauthProfile } from './OauthProfile';
import type { OauthProfileLinks } from './OauthProfileLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileResponse = {
    data?: OauthProfile;
    links?: OauthProfileLinks;
    meta: SempMeta;
}

export namespace OauthProfileResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileResponse';


}
/* eslint-disable */


import type { OauthProfile } from './OauthProfile';
import type { OauthProfileLinks } from './OauthProfileLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfilesResponse = {
    data?: Array<OauthProfile>;
    links?: Array<OauthProfileLinks>;
    meta: SempMeta;
}

export namespace OauthProfilesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfilesResponse';


}
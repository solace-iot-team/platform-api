/* eslint-disable */


import type { OauthProfileAccessLevelGroup } from './OauthProfileAccessLevelGroup';
import type { OauthProfileAccessLevelGroupLinks } from './OauthProfileAccessLevelGroupLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileAccessLevelGroupsResponse = {
    data?: Array<OauthProfileAccessLevelGroup>;
    links?: Array<OauthProfileAccessLevelGroupLinks>;
    meta: SempMeta;
}

export namespace OauthProfileAccessLevelGroupsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileAccessLevelGroupsResponse';


}
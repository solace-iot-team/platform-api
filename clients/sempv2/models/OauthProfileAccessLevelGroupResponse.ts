/* eslint-disable */


import type { OauthProfileAccessLevelGroup } from './OauthProfileAccessLevelGroup';
import type { OauthProfileAccessLevelGroupLinks } from './OauthProfileAccessLevelGroupLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileAccessLevelGroupResponse = {
    data?: OauthProfileAccessLevelGroup;
    links?: OauthProfileAccessLevelGroupLinks;
    meta: SempMeta;
}

export namespace OauthProfileAccessLevelGroupResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileAccessLevelGroupResponse';


}
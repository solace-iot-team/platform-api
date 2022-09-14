/* eslint-disable */


import type { OauthProfileAccessLevelGroupMsgVpnAccessLevelException } from './OauthProfileAccessLevelGroupMsgVpnAccessLevelException';
import type { OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionLinks } from './OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionsResponse = {
    data?: Array<OauthProfileAccessLevelGroupMsgVpnAccessLevelException>;
    links?: Array<OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionLinks>;
    meta: SempMeta;
}

export namespace OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionsResponse';


}
/* eslint-disable */


import type { OauthProfileAccessLevelGroupMsgVpnAccessLevelException } from './OauthProfileAccessLevelGroupMsgVpnAccessLevelException';
import type { OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionLinks } from './OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionResponse = {
    data?: OauthProfileAccessLevelGroupMsgVpnAccessLevelException;
    links?: OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionLinks;
    meta: SempMeta;
}

export namespace OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileAccessLevelGroupMsgVpnAccessLevelExceptionResponse';


}
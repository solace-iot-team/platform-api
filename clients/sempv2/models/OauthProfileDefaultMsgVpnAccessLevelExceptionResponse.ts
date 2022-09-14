/* eslint-disable */


import type { OauthProfileDefaultMsgVpnAccessLevelException } from './OauthProfileDefaultMsgVpnAccessLevelException';
import type { OauthProfileDefaultMsgVpnAccessLevelExceptionLinks } from './OauthProfileDefaultMsgVpnAccessLevelExceptionLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileDefaultMsgVpnAccessLevelExceptionResponse = {
    data?: OauthProfileDefaultMsgVpnAccessLevelException;
    links?: OauthProfileDefaultMsgVpnAccessLevelExceptionLinks;
    meta: SempMeta;
}

export namespace OauthProfileDefaultMsgVpnAccessLevelExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileDefaultMsgVpnAccessLevelExceptionResponse';


}
/* eslint-disable */


import type { OauthProfileDefaultMsgVpnAccessLevelException } from './OauthProfileDefaultMsgVpnAccessLevelException';
import type { OauthProfileDefaultMsgVpnAccessLevelExceptionLinks } from './OauthProfileDefaultMsgVpnAccessLevelExceptionLinks';
import type { SempMeta } from './SempMeta';

export type OauthProfileDefaultMsgVpnAccessLevelExceptionsResponse = {
    data?: Array<OauthProfileDefaultMsgVpnAccessLevelException>;
    links?: Array<OauthProfileDefaultMsgVpnAccessLevelExceptionLinks>;
    meta: SempMeta;
}

export namespace OauthProfileDefaultMsgVpnAccessLevelExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileDefaultMsgVpnAccessLevelExceptionsResponse';


}
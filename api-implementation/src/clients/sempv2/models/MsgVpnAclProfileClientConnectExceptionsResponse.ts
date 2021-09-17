/* eslint-disable */


import type { MsgVpnAclProfileClientConnectException } from './MsgVpnAclProfileClientConnectException';
import type { MsgVpnAclProfileClientConnectExceptionLinks } from './MsgVpnAclProfileClientConnectExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileClientConnectExceptionsResponse = {
    data?: Array<MsgVpnAclProfileClientConnectException>;
    links?: Array<MsgVpnAclProfileClientConnectExceptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileClientConnectExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileClientConnectExceptionsResponse';


}
/* eslint-disable */


import type { MsgVpnAclProfileClientConnectException } from './MsgVpnAclProfileClientConnectException';
import type { MsgVpnAclProfileClientConnectExceptionLinks } from './MsgVpnAclProfileClientConnectExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileClientConnectExceptionResponse = {
    data?: MsgVpnAclProfileClientConnectException;
    links?: MsgVpnAclProfileClientConnectExceptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileClientConnectExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileClientConnectExceptionResponse';


}
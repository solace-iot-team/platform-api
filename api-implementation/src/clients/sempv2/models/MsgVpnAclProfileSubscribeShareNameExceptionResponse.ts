/* eslint-disable */


import type { MsgVpnAclProfileSubscribeShareNameException } from './MsgVpnAclProfileSubscribeShareNameException';
import type { MsgVpnAclProfileSubscribeShareNameExceptionLinks } from './MsgVpnAclProfileSubscribeShareNameExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeShareNameExceptionResponse = {
    data?: MsgVpnAclProfileSubscribeShareNameException;
    links?: MsgVpnAclProfileSubscribeShareNameExceptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileSubscribeShareNameExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileSubscribeShareNameExceptionResponse';


}
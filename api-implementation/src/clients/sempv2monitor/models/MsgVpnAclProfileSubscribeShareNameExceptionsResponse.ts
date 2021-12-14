/* eslint-disable */


import type { MsgVpnAclProfileSubscribeShareNameException } from './MsgVpnAclProfileSubscribeShareNameException';
import type { MsgVpnAclProfileSubscribeShareNameExceptionCollections } from './MsgVpnAclProfileSubscribeShareNameExceptionCollections';
import type { MsgVpnAclProfileSubscribeShareNameExceptionLinks } from './MsgVpnAclProfileSubscribeShareNameExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeShareNameExceptionsResponse = {
    collections?: Array<MsgVpnAclProfileSubscribeShareNameExceptionCollections>;
    data?: Array<MsgVpnAclProfileSubscribeShareNameException>;
    links?: Array<MsgVpnAclProfileSubscribeShareNameExceptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileSubscribeShareNameExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileSubscribeShareNameExceptionsResponse';


}
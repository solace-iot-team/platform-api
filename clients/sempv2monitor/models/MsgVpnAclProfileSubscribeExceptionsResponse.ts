/* eslint-disable */


import type { MsgVpnAclProfileSubscribeException } from './MsgVpnAclProfileSubscribeException';
import type { MsgVpnAclProfileSubscribeExceptionCollections } from './MsgVpnAclProfileSubscribeExceptionCollections';
import type { MsgVpnAclProfileSubscribeExceptionLinks } from './MsgVpnAclProfileSubscribeExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeExceptionsResponse = {
    collections?: Array<MsgVpnAclProfileSubscribeExceptionCollections>;
    data?: Array<MsgVpnAclProfileSubscribeException>;
    links?: Array<MsgVpnAclProfileSubscribeExceptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileSubscribeExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileSubscribeExceptionsResponse';


}
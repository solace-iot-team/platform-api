/* eslint-disable */


import type { MsgVpnAclProfilePublishException } from './MsgVpnAclProfilePublishException';
import type { MsgVpnAclProfilePublishExceptionCollections } from './MsgVpnAclProfilePublishExceptionCollections';
import type { MsgVpnAclProfilePublishExceptionLinks } from './MsgVpnAclProfilePublishExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilePublishExceptionResponse = {
    collections?: MsgVpnAclProfilePublishExceptionCollections;
    data?: MsgVpnAclProfilePublishException;
    links?: MsgVpnAclProfilePublishExceptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnAclProfilePublishExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfilePublishExceptionResponse';


}
/* eslint-disable */


import type { MsgVpnAclProfilePublishException } from './MsgVpnAclProfilePublishException';
import type { MsgVpnAclProfilePublishExceptionCollections } from './MsgVpnAclProfilePublishExceptionCollections';
import type { MsgVpnAclProfilePublishExceptionLinks } from './MsgVpnAclProfilePublishExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilePublishExceptionsResponse = {
    collections?: Array<MsgVpnAclProfilePublishExceptionCollections>;
    data?: Array<MsgVpnAclProfilePublishException>;
    links?: Array<MsgVpnAclProfilePublishExceptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfilePublishExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfilePublishExceptionsResponse';


}
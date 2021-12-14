/* eslint-disable */


import type { MsgVpnAclProfilePublishTopicException } from './MsgVpnAclProfilePublishTopicException';
import type { MsgVpnAclProfilePublishTopicExceptionCollections } from './MsgVpnAclProfilePublishTopicExceptionCollections';
import type { MsgVpnAclProfilePublishTopicExceptionLinks } from './MsgVpnAclProfilePublishTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilePublishTopicExceptionResponse = {
    collections?: MsgVpnAclProfilePublishTopicExceptionCollections;
    data?: MsgVpnAclProfilePublishTopicException;
    links?: MsgVpnAclProfilePublishTopicExceptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnAclProfilePublishTopicExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfilePublishTopicExceptionResponse';


}
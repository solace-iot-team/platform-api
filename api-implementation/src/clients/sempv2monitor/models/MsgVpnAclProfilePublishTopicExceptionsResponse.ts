/* eslint-disable */


import type { MsgVpnAclProfilePublishTopicException } from './MsgVpnAclProfilePublishTopicException';
import type { MsgVpnAclProfilePublishTopicExceptionCollections } from './MsgVpnAclProfilePublishTopicExceptionCollections';
import type { MsgVpnAclProfilePublishTopicExceptionLinks } from './MsgVpnAclProfilePublishTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilePublishTopicExceptionsResponse = {
    collections?: Array<MsgVpnAclProfilePublishTopicExceptionCollections>;
    data?: Array<MsgVpnAclProfilePublishTopicException>;
    links?: Array<MsgVpnAclProfilePublishTopicExceptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfilePublishTopicExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfilePublishTopicExceptionsResponse';


}
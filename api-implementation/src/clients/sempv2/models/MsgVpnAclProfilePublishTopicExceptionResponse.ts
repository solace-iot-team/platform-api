/* eslint-disable */


import type { MsgVpnAclProfilePublishTopicException } from './MsgVpnAclProfilePublishTopicException';
import type { MsgVpnAclProfilePublishTopicExceptionLinks } from './MsgVpnAclProfilePublishTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilePublishTopicExceptionResponse = {
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
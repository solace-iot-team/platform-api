/* eslint-disable */


import type { MsgVpnAclProfileSubscribeTopicException } from './MsgVpnAclProfileSubscribeTopicException';
import type { MsgVpnAclProfileSubscribeTopicExceptionCollections } from './MsgVpnAclProfileSubscribeTopicExceptionCollections';
import type { MsgVpnAclProfileSubscribeTopicExceptionLinks } from './MsgVpnAclProfileSubscribeTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeTopicExceptionsResponse = {
    collections?: Array<MsgVpnAclProfileSubscribeTopicExceptionCollections>;
    data?: Array<MsgVpnAclProfileSubscribeTopicException>;
    links?: Array<MsgVpnAclProfileSubscribeTopicExceptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileSubscribeTopicExceptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileSubscribeTopicExceptionsResponse';


}
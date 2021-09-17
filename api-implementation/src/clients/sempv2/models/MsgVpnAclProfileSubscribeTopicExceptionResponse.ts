/* eslint-disable */


import type { MsgVpnAclProfileSubscribeTopicException } from './MsgVpnAclProfileSubscribeTopicException';
import type { MsgVpnAclProfileSubscribeTopicExceptionLinks } from './MsgVpnAclProfileSubscribeTopicExceptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileSubscribeTopicExceptionResponse = {
    data?: MsgVpnAclProfileSubscribeTopicException;
    links?: MsgVpnAclProfileSubscribeTopicExceptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileSubscribeTopicExceptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileSubscribeTopicExceptionResponse';


}
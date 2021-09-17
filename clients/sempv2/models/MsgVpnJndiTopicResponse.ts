/* eslint-disable */


import type { MsgVpnJndiTopic } from './MsgVpnJndiTopic';
import type { MsgVpnJndiTopicLinks } from './MsgVpnJndiTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnJndiTopicResponse = {
    data?: MsgVpnJndiTopic;
    links?: MsgVpnJndiTopicLinks;
    meta: SempMeta;
}

export namespace MsgVpnJndiTopicResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiTopicResponse';


}
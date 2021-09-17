/* eslint-disable */


import type { MsgVpnReplicatedTopic } from './MsgVpnReplicatedTopic';
import type { MsgVpnReplicatedTopicLinks } from './MsgVpnReplicatedTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplicatedTopicResponse = {
    data?: MsgVpnReplicatedTopic;
    links?: MsgVpnReplicatedTopicLinks;
    meta: SempMeta;
}

export namespace MsgVpnReplicatedTopicResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplicatedTopicResponse';


}
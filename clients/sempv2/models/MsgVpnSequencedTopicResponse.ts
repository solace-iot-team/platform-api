/* eslint-disable */


import type { MsgVpnSequencedTopic } from './MsgVpnSequencedTopic';
import type { MsgVpnSequencedTopicLinks } from './MsgVpnSequencedTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnSequencedTopicResponse = {
    data?: MsgVpnSequencedTopic;
    links?: MsgVpnSequencedTopicLinks;
    meta: SempMeta;
}

export namespace MsgVpnSequencedTopicResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnSequencedTopicResponse';


}
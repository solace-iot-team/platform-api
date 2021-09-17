/* eslint-disable */


import type { MsgVpnSequencedTopic } from './MsgVpnSequencedTopic';
import type { MsgVpnSequencedTopicLinks } from './MsgVpnSequencedTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnSequencedTopicsResponse = {
    data?: Array<MsgVpnSequencedTopic>;
    links?: Array<MsgVpnSequencedTopicLinks>;
    meta: SempMeta;
}

export namespace MsgVpnSequencedTopicsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnSequencedTopicsResponse';


}
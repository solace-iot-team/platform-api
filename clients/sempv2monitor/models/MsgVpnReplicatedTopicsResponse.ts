/* eslint-disable */


import type { MsgVpnReplicatedTopic } from './MsgVpnReplicatedTopic';
import type { MsgVpnReplicatedTopicCollections } from './MsgVpnReplicatedTopicCollections';
import type { MsgVpnReplicatedTopicLinks } from './MsgVpnReplicatedTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplicatedTopicsResponse = {
    collections?: Array<MsgVpnReplicatedTopicCollections>;
    data?: Array<MsgVpnReplicatedTopic>;
    links?: Array<MsgVpnReplicatedTopicLinks>;
    meta: SempMeta;
}

export namespace MsgVpnReplicatedTopicsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplicatedTopicsResponse';


}
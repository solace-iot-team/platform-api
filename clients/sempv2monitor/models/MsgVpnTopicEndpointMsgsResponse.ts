/* eslint-disable */


import type { MsgVpnTopicEndpointMsg } from './MsgVpnTopicEndpointMsg';
import type { MsgVpnTopicEndpointMsgCollections } from './MsgVpnTopicEndpointMsgCollections';
import type { MsgVpnTopicEndpointMsgLinks } from './MsgVpnTopicEndpointMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointMsgsResponse = {
    collections?: Array<MsgVpnTopicEndpointMsgCollections>;
    data?: Array<MsgVpnTopicEndpointMsg>;
    links?: Array<MsgVpnTopicEndpointMsgLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointMsgsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointMsgsResponse';


}
/* eslint-disable */


import type { MsgVpnTopicEndpointMsg } from './MsgVpnTopicEndpointMsg';
import type { MsgVpnTopicEndpointMsgCollections } from './MsgVpnTopicEndpointMsgCollections';
import type { MsgVpnTopicEndpointMsgLinks } from './MsgVpnTopicEndpointMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointMsgResponse = {
    collections?: MsgVpnTopicEndpointMsgCollections;
    data?: MsgVpnTopicEndpointMsg;
    links?: MsgVpnTopicEndpointMsgLinks;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointMsgResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointMsgResponse';


}
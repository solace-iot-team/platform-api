/* eslint-disable */


import type { MsgVpnTopicEndpointTxFlow } from './MsgVpnTopicEndpointTxFlow';
import type { MsgVpnTopicEndpointTxFlowCollections } from './MsgVpnTopicEndpointTxFlowCollections';
import type { MsgVpnTopicEndpointTxFlowLinks } from './MsgVpnTopicEndpointTxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointTxFlowResponse = {
    collections?: MsgVpnTopicEndpointTxFlowCollections;
    data?: MsgVpnTopicEndpointTxFlow;
    links?: MsgVpnTopicEndpointTxFlowLinks;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointTxFlowResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointTxFlowResponse';


}
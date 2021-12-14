/* eslint-disable */


import type { MsgVpnTopicEndpointTxFlow } from './MsgVpnTopicEndpointTxFlow';
import type { MsgVpnTopicEndpointTxFlowCollections } from './MsgVpnTopicEndpointTxFlowCollections';
import type { MsgVpnTopicEndpointTxFlowLinks } from './MsgVpnTopicEndpointTxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointTxFlowsResponse = {
    collections?: Array<MsgVpnTopicEndpointTxFlowCollections>;
    data?: Array<MsgVpnTopicEndpointTxFlow>;
    links?: Array<MsgVpnTopicEndpointTxFlowLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointTxFlowsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointTxFlowsResponse';


}
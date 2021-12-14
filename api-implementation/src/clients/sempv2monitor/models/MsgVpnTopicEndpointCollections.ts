/* eslint-disable */


import type { MsgVpnTopicEndpointCollectionsMsgs } from './MsgVpnTopicEndpointCollectionsMsgs';
import type { MsgVpnTopicEndpointCollectionsPriorities } from './MsgVpnTopicEndpointCollectionsPriorities';
import type { MsgVpnTopicEndpointCollectionsTxflows } from './MsgVpnTopicEndpointCollectionsTxflows';

export type MsgVpnTopicEndpointCollections = {
    msgs?: MsgVpnTopicEndpointCollectionsMsgs;
    priorities?: MsgVpnTopicEndpointCollectionsPriorities;
    txFlows?: MsgVpnTopicEndpointCollectionsTxflows;
}

export namespace MsgVpnTopicEndpointCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointCollections';


}
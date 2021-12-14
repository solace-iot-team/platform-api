/* eslint-disable */


import type { MsgVpnTopicEndpointPriority } from './MsgVpnTopicEndpointPriority';
import type { MsgVpnTopicEndpointPriorityCollections } from './MsgVpnTopicEndpointPriorityCollections';
import type { MsgVpnTopicEndpointPriorityLinks } from './MsgVpnTopicEndpointPriorityLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointPrioritiesResponse = {
    collections?: Array<MsgVpnTopicEndpointPriorityCollections>;
    data?: Array<MsgVpnTopicEndpointPriority>;
    links?: Array<MsgVpnTopicEndpointPriorityLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointPrioritiesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointPrioritiesResponse';


}
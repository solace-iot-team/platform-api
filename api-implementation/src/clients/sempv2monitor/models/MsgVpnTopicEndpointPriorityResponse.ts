/* eslint-disable */


import type { MsgVpnTopicEndpointPriority } from './MsgVpnTopicEndpointPriority';
import type { MsgVpnTopicEndpointPriorityCollections } from './MsgVpnTopicEndpointPriorityCollections';
import type { MsgVpnTopicEndpointPriorityLinks } from './MsgVpnTopicEndpointPriorityLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointPriorityResponse = {
    collections?: MsgVpnTopicEndpointPriorityCollections;
    data?: MsgVpnTopicEndpointPriority;
    links?: MsgVpnTopicEndpointPriorityLinks;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointPriorityResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointPriorityResponse';


}
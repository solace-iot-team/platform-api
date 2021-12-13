/* eslint-disable */


import type { MsgVpnTopicEndpoint } from './MsgVpnTopicEndpoint';
import type { MsgVpnTopicEndpointCollections } from './MsgVpnTopicEndpointCollections';
import type { MsgVpnTopicEndpointLinks } from './MsgVpnTopicEndpointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointsResponse = {
    collections?: Array<MsgVpnTopicEndpointCollections>;
    data?: Array<MsgVpnTopicEndpoint>;
    links?: Array<MsgVpnTopicEndpointLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointsResponse';


}
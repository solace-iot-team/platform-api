/* eslint-disable */


import type { MsgVpnTopicEndpoint } from './MsgVpnTopicEndpoint';
import type { MsgVpnTopicEndpointCollections } from './MsgVpnTopicEndpointCollections';
import type { MsgVpnTopicEndpointLinks } from './MsgVpnTopicEndpointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointResponse = {
    collections?: MsgVpnTopicEndpointCollections;
    data?: MsgVpnTopicEndpoint;
    links?: MsgVpnTopicEndpointLinks;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointResponse';


}
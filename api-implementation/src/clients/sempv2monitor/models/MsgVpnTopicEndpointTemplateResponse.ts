/* eslint-disable */


import type { MsgVpnTopicEndpointTemplate } from './MsgVpnTopicEndpointTemplate';
import type { MsgVpnTopicEndpointTemplateCollections } from './MsgVpnTopicEndpointTemplateCollections';
import type { MsgVpnTopicEndpointTemplateLinks } from './MsgVpnTopicEndpointTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointTemplateResponse = {
    collections?: MsgVpnTopicEndpointTemplateCollections;
    data?: MsgVpnTopicEndpointTemplate;
    links?: MsgVpnTopicEndpointTemplateLinks;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointTemplateResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointTemplateResponse';


}
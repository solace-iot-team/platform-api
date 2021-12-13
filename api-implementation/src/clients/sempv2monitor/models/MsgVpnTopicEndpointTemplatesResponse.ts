/* eslint-disable */


import type { MsgVpnTopicEndpointTemplate } from './MsgVpnTopicEndpointTemplate';
import type { MsgVpnTopicEndpointTemplateCollections } from './MsgVpnTopicEndpointTemplateCollections';
import type { MsgVpnTopicEndpointTemplateLinks } from './MsgVpnTopicEndpointTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointTemplatesResponse = {
    collections?: Array<MsgVpnTopicEndpointTemplateCollections>;
    data?: Array<MsgVpnTopicEndpointTemplate>;
    links?: Array<MsgVpnTopicEndpointTemplateLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTopicEndpointTemplatesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointTemplatesResponse';


}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnTopicEndpointTemplate } from './MsgVpnTopicEndpointTemplate';
import type { MsgVpnTopicEndpointTemplateLinks } from './MsgVpnTopicEndpointTemplateLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnTopicEndpointTemplatesResponse {
    data?: Array<MsgVpnTopicEndpointTemplate>;
    links?: Array<MsgVpnTopicEndpointTemplateLinks>;
    meta: SempMeta;
}

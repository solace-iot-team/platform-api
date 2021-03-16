/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnTopicEndpointTemplate } from './MsgVpnTopicEndpointTemplate';
import type { MsgVpnTopicEndpointTemplateLinks } from './MsgVpnTopicEndpointTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointTemplateResponse = {
    data?: MsgVpnTopicEndpointTemplate;
    links?: MsgVpnTopicEndpointTemplateLinks;
    meta: SempMeta;
}

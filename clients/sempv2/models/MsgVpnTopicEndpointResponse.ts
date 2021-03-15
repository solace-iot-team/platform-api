/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnTopicEndpoint } from './MsgVpnTopicEndpoint';
import type { MsgVpnTopicEndpointLinks } from './MsgVpnTopicEndpointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointResponse = {
    data?: MsgVpnTopicEndpoint;
    links?: MsgVpnTopicEndpointLinks;
    meta: SempMeta;
}

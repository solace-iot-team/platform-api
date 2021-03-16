/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnTopicEndpoint } from './MsgVpnTopicEndpoint';
import type { MsgVpnTopicEndpointLinks } from './MsgVpnTopicEndpointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTopicEndpointsResponse = {
    data?: Array<MsgVpnTopicEndpoint>;
    links?: Array<MsgVpnTopicEndpointLinks>;
    meta: SempMeta;
}

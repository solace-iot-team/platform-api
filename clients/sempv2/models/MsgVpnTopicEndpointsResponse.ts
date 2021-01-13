/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnTopicEndpoint } from './MsgVpnTopicEndpoint';
import type { MsgVpnTopicEndpointLinks } from './MsgVpnTopicEndpointLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnTopicEndpointsResponse {
    data?: Array<MsgVpnTopicEndpoint>;
    links?: Array<MsgVpnTopicEndpointLinks>;
    meta: SempMeta;
}

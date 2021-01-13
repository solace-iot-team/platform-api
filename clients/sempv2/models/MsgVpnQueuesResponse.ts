/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnQueue } from './MsgVpnQueue';
import type { MsgVpnQueueLinks } from './MsgVpnQueueLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnQueuesResponse {
    data?: Array<MsgVpnQueue>;
    links?: Array<MsgVpnQueueLinks>;
    meta: SempMeta;
}

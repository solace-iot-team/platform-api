/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnMqttSession } from './MsgVpnMqttSession';
import type { MsgVpnMqttSessionLinks } from './MsgVpnMqttSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionsResponse = {
    data?: Array<MsgVpnMqttSession>;
    links?: Array<MsgVpnMqttSessionLinks>;
    meta: SempMeta;
}

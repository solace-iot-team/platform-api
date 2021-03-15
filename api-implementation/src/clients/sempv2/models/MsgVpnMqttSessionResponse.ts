/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnMqttSession } from './MsgVpnMqttSession';
import type { MsgVpnMqttSessionLinks } from './MsgVpnMqttSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionResponse = {
    data?: MsgVpnMqttSession;
    links?: MsgVpnMqttSessionLinks;
    meta: SempMeta;
}

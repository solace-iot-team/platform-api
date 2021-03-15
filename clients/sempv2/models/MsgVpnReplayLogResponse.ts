/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnReplayLog } from './MsgVpnReplayLog';
import type { MsgVpnReplayLogLinks } from './MsgVpnReplayLogLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogResponse = {
    data?: MsgVpnReplayLog;
    links?: MsgVpnReplayLogLinks;
    meta: SempMeta;
}

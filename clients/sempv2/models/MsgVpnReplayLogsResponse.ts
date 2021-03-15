/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnReplayLog } from './MsgVpnReplayLog';
import type { MsgVpnReplayLogLinks } from './MsgVpnReplayLogLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogsResponse = {
    data?: Array<MsgVpnReplayLog>;
    links?: Array<MsgVpnReplayLogLinks>;
    meta: SempMeta;
}

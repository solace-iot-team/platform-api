/* eslint-disable */


import type { MsgVpnReplayLog } from './MsgVpnReplayLog';
import type { MsgVpnReplayLogLinks } from './MsgVpnReplayLogLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogsResponse = {
    data?: Array<MsgVpnReplayLog>;
    links?: Array<MsgVpnReplayLogLinks>;
    meta: SempMeta;
}

export namespace MsgVpnReplayLogsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogsResponse';


}
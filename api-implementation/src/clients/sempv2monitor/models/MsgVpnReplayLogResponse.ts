/* eslint-disable */


import type { MsgVpnReplayLog } from './MsgVpnReplayLog';
import type { MsgVpnReplayLogCollections } from './MsgVpnReplayLogCollections';
import type { MsgVpnReplayLogLinks } from './MsgVpnReplayLogLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogResponse = {
    collections?: MsgVpnReplayLogCollections;
    data?: MsgVpnReplayLog;
    links?: MsgVpnReplayLogLinks;
    meta: SempMeta;
}

export namespace MsgVpnReplayLogResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogResponse';


}
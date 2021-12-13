/* eslint-disable */


import type { MsgVpnReplayLogMsg } from './MsgVpnReplayLogMsg';
import type { MsgVpnReplayLogMsgCollections } from './MsgVpnReplayLogMsgCollections';
import type { MsgVpnReplayLogMsgLinks } from './MsgVpnReplayLogMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogMsgsResponse = {
    collections?: Array<MsgVpnReplayLogMsgCollections>;
    data?: Array<MsgVpnReplayLogMsg>;
    links?: Array<MsgVpnReplayLogMsgLinks>;
    meta: SempMeta;
}

export namespace MsgVpnReplayLogMsgsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogMsgsResponse';


}
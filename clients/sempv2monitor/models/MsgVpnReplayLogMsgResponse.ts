/* eslint-disable */


import type { MsgVpnReplayLogMsg } from './MsgVpnReplayLogMsg';
import type { MsgVpnReplayLogMsgCollections } from './MsgVpnReplayLogMsgCollections';
import type { MsgVpnReplayLogMsgLinks } from './MsgVpnReplayLogMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogMsgResponse = {
    collections?: MsgVpnReplayLogMsgCollections;
    data?: MsgVpnReplayLogMsg;
    links?: MsgVpnReplayLogMsgLinks;
    meta: SempMeta;
}

export namespace MsgVpnReplayLogMsgResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogMsgResponse';


}
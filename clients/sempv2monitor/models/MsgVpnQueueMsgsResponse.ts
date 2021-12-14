/* eslint-disable */


import type { MsgVpnQueueMsg } from './MsgVpnQueueMsg';
import type { MsgVpnQueueMsgCollections } from './MsgVpnQueueMsgCollections';
import type { MsgVpnQueueMsgLinks } from './MsgVpnQueueMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueMsgsResponse = {
    collections?: Array<MsgVpnQueueMsgCollections>;
    data?: Array<MsgVpnQueueMsg>;
    links?: Array<MsgVpnQueueMsgLinks>;
    meta: SempMeta;
}

export namespace MsgVpnQueueMsgsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueMsgsResponse';


}
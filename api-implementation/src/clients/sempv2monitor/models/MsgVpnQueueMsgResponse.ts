/* eslint-disable */


import type { MsgVpnQueueMsg } from './MsgVpnQueueMsg';
import type { MsgVpnQueueMsgCollections } from './MsgVpnQueueMsgCollections';
import type { MsgVpnQueueMsgLinks } from './MsgVpnQueueMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueMsgResponse = {
    collections?: MsgVpnQueueMsgCollections;
    data?: MsgVpnQueueMsg;
    links?: MsgVpnQueueMsgLinks;
    meta: SempMeta;
}

export namespace MsgVpnQueueMsgResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueMsgResponse';


}
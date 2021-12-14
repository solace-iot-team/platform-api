/* eslint-disable */


import type { MsgVpnTransactionPublisherMsg } from './MsgVpnTransactionPublisherMsg';
import type { MsgVpnTransactionPublisherMsgCollections } from './MsgVpnTransactionPublisherMsgCollections';
import type { MsgVpnTransactionPublisherMsgLinks } from './MsgVpnTransactionPublisherMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTransactionPublisherMsgResponse = {
    collections?: MsgVpnTransactionPublisherMsgCollections;
    data?: MsgVpnTransactionPublisherMsg;
    links?: MsgVpnTransactionPublisherMsgLinks;
    meta: SempMeta;
}

export namespace MsgVpnTransactionPublisherMsgResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionPublisherMsgResponse';


}
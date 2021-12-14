/* eslint-disable */


import type { MsgVpnTransactionConsumerMsg } from './MsgVpnTransactionConsumerMsg';
import type { MsgVpnTransactionConsumerMsgCollections } from './MsgVpnTransactionConsumerMsgCollections';
import type { MsgVpnTransactionConsumerMsgLinks } from './MsgVpnTransactionConsumerMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTransactionConsumerMsgResponse = {
    collections?: MsgVpnTransactionConsumerMsgCollections;
    data?: MsgVpnTransactionConsumerMsg;
    links?: MsgVpnTransactionConsumerMsgLinks;
    meta: SempMeta;
}

export namespace MsgVpnTransactionConsumerMsgResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionConsumerMsgResponse';


}
/* eslint-disable */


import type { MsgVpnTransactionConsumerMsg } from './MsgVpnTransactionConsumerMsg';
import type { MsgVpnTransactionConsumerMsgCollections } from './MsgVpnTransactionConsumerMsgCollections';
import type { MsgVpnTransactionConsumerMsgLinks } from './MsgVpnTransactionConsumerMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTransactionConsumerMsgsResponse = {
    collections?: Array<MsgVpnTransactionConsumerMsgCollections>;
    data?: Array<MsgVpnTransactionConsumerMsg>;
    links?: Array<MsgVpnTransactionConsumerMsgLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTransactionConsumerMsgsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionConsumerMsgsResponse';


}
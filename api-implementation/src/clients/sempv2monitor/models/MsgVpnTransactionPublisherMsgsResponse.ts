/* eslint-disable */


import type { MsgVpnTransactionPublisherMsg } from './MsgVpnTransactionPublisherMsg';
import type { MsgVpnTransactionPublisherMsgCollections } from './MsgVpnTransactionPublisherMsgCollections';
import type { MsgVpnTransactionPublisherMsgLinks } from './MsgVpnTransactionPublisherMsgLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTransactionPublisherMsgsResponse = {
    collections?: Array<MsgVpnTransactionPublisherMsgCollections>;
    data?: Array<MsgVpnTransactionPublisherMsg>;
    links?: Array<MsgVpnTransactionPublisherMsgLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTransactionPublisherMsgsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionPublisherMsgsResponse';


}
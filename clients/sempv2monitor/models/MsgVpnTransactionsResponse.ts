/* eslint-disable */


import type { MsgVpnTransaction } from './MsgVpnTransaction';
import type { MsgVpnTransactionCollections } from './MsgVpnTransactionCollections';
import type { MsgVpnTransactionLinks } from './MsgVpnTransactionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTransactionsResponse = {
    collections?: Array<MsgVpnTransactionCollections>;
    data?: Array<MsgVpnTransaction>;
    links?: Array<MsgVpnTransactionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnTransactionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionsResponse';


}
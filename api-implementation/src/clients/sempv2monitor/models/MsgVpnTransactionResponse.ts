/* eslint-disable */


import type { MsgVpnTransaction } from './MsgVpnTransaction';
import type { MsgVpnTransactionCollections } from './MsgVpnTransactionCollections';
import type { MsgVpnTransactionLinks } from './MsgVpnTransactionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnTransactionResponse = {
    collections?: MsgVpnTransactionCollections;
    data?: MsgVpnTransaction;
    links?: MsgVpnTransactionLinks;
    meta: SempMeta;
}

export namespace MsgVpnTransactionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionResponse';


}
/* eslint-disable */


import type { MsgVpnTransactionCollectionsConsumermsgs } from './MsgVpnTransactionCollectionsConsumermsgs';
import type { MsgVpnTransactionCollectionsPublishermsgs } from './MsgVpnTransactionCollectionsPublishermsgs';

export type MsgVpnTransactionCollections = {
    consumerMsgs?: MsgVpnTransactionCollectionsConsumermsgs;
    publisherMsgs?: MsgVpnTransactionCollectionsPublishermsgs;
}

export namespace MsgVpnTransactionCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionCollections';


}
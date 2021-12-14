/* eslint-disable */


import type { MsgVpnClientCollectionsConnections } from './MsgVpnClientCollectionsConnections';
import type { MsgVpnClientCollectionsRxflows } from './MsgVpnClientCollectionsRxflows';
import type { MsgVpnClientCollectionsSubscriptions } from './MsgVpnClientCollectionsSubscriptions';
import type { MsgVpnClientCollectionsTransactedsessions } from './MsgVpnClientCollectionsTransactedsessions';
import type { MsgVpnClientCollectionsTxflows } from './MsgVpnClientCollectionsTxflows';

export type MsgVpnClientCollections = {
    connections?: MsgVpnClientCollectionsConnections;
    rxFlows?: MsgVpnClientCollectionsRxflows;
    subscriptions?: MsgVpnClientCollectionsSubscriptions;
    transactedSessions?: MsgVpnClientCollectionsTransactedsessions;
    txFlows?: MsgVpnClientCollectionsTxflows;
}

export namespace MsgVpnClientCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientCollections';


}
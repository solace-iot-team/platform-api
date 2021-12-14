/* eslint-disable */


import type { MsgVpnQueueCollectionsMsgs } from './MsgVpnQueueCollectionsMsgs';
import type { MsgVpnQueueCollectionsPriorities } from './MsgVpnQueueCollectionsPriorities';
import type { MsgVpnQueueCollectionsSubscriptions } from './MsgVpnQueueCollectionsSubscriptions';
import type { MsgVpnQueueCollectionsTxflows } from './MsgVpnQueueCollectionsTxflows';

export type MsgVpnQueueCollections = {
    msgs?: MsgVpnQueueCollectionsMsgs;
    priorities?: MsgVpnQueueCollectionsPriorities;
    subscriptions?: MsgVpnQueueCollectionsSubscriptions;
    txFlows?: MsgVpnQueueCollectionsTxflows;
}

export namespace MsgVpnQueueCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueCollections';


}
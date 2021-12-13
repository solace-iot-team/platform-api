/* eslint-disable */


import type { MsgVpnBridgeCollectionsLocalsubscriptions } from './MsgVpnBridgeCollectionsLocalsubscriptions';
import type { MsgVpnBridgeCollectionsRemotemsgvpns } from './MsgVpnBridgeCollectionsRemotemsgvpns';
import type { MsgVpnBridgeCollectionsRemotesubscriptions } from './MsgVpnBridgeCollectionsRemotesubscriptions';
import type { MsgVpnBridgeCollectionsTlstrustedcommonnames } from './MsgVpnBridgeCollectionsTlstrustedcommonnames';

export type MsgVpnBridgeCollections = {
    localSubscriptions?: MsgVpnBridgeCollectionsLocalsubscriptions;
    remoteMsgVpns?: MsgVpnBridgeCollectionsRemotemsgvpns;
    remoteSubscriptions?: MsgVpnBridgeCollectionsRemotesubscriptions;
    tlsTrustedCommonNames?: MsgVpnBridgeCollectionsTlstrustedcommonnames;
}

export namespace MsgVpnBridgeCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeCollections';


}
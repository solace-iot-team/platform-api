/* eslint-disable */


import type { MsgVpnBridgeRemoteSubscription } from './MsgVpnBridgeRemoteSubscription';
import type { MsgVpnBridgeRemoteSubscriptionCollections } from './MsgVpnBridgeRemoteSubscriptionCollections';
import type { MsgVpnBridgeRemoteSubscriptionLinks } from './MsgVpnBridgeRemoteSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeRemoteSubscriptionResponse = {
    collections?: MsgVpnBridgeRemoteSubscriptionCollections;
    data?: MsgVpnBridgeRemoteSubscription;
    links?: MsgVpnBridgeRemoteSubscriptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnBridgeRemoteSubscriptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRemoteSubscriptionResponse';


}
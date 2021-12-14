/* eslint-disable */


import type { MsgVpnBridgeLocalSubscription } from './MsgVpnBridgeLocalSubscription';
import type { MsgVpnBridgeLocalSubscriptionCollections } from './MsgVpnBridgeLocalSubscriptionCollections';
import type { MsgVpnBridgeLocalSubscriptionLinks } from './MsgVpnBridgeLocalSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeLocalSubscriptionResponse = {
    collections?: MsgVpnBridgeLocalSubscriptionCollections;
    data?: MsgVpnBridgeLocalSubscription;
    links?: MsgVpnBridgeLocalSubscriptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnBridgeLocalSubscriptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeLocalSubscriptionResponse';


}
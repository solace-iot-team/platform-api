/* eslint-disable */


import type { MsgVpnBridgeLocalSubscription } from './MsgVpnBridgeLocalSubscription';
import type { MsgVpnBridgeLocalSubscriptionCollections } from './MsgVpnBridgeLocalSubscriptionCollections';
import type { MsgVpnBridgeLocalSubscriptionLinks } from './MsgVpnBridgeLocalSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeLocalSubscriptionsResponse = {
    collections?: Array<MsgVpnBridgeLocalSubscriptionCollections>;
    data?: Array<MsgVpnBridgeLocalSubscription>;
    links?: Array<MsgVpnBridgeLocalSubscriptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnBridgeLocalSubscriptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeLocalSubscriptionsResponse';


}
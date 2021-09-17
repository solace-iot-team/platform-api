/* eslint-disable */


import type { MsgVpnBridgeRemoteSubscription } from './MsgVpnBridgeRemoteSubscription';
import type { MsgVpnBridgeRemoteSubscriptionLinks } from './MsgVpnBridgeRemoteSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeRemoteSubscriptionsResponse = {
    data?: Array<MsgVpnBridgeRemoteSubscription>;
    links?: Array<MsgVpnBridgeRemoteSubscriptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnBridgeRemoteSubscriptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRemoteSubscriptionsResponse';


}
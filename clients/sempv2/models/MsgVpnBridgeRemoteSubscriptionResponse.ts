/* eslint-disable */


import type { MsgVpnBridgeRemoteSubscription } from './MsgVpnBridgeRemoteSubscription';
import type { MsgVpnBridgeRemoteSubscriptionLinks } from './MsgVpnBridgeRemoteSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeRemoteSubscriptionResponse = {
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
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnBridgeRemoteSubscription } from './MsgVpnBridgeRemoteSubscription';
import type { MsgVpnBridgeRemoteSubscriptionLinks } from './MsgVpnBridgeRemoteSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeRemoteSubscriptionResponse = {
    data?: MsgVpnBridgeRemoteSubscription;
    links?: MsgVpnBridgeRemoteSubscriptionLinks;
    meta: SempMeta;
}

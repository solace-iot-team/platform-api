/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnBridgeRemoteSubscription } from './MsgVpnBridgeRemoteSubscription';
import type { MsgVpnBridgeRemoteSubscriptionLinks } from './MsgVpnBridgeRemoteSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnBridgeRemoteSubscriptionsResponse {
    data?: Array<MsgVpnBridgeRemoteSubscription>;
    links?: Array<MsgVpnBridgeRemoteSubscriptionLinks>;
    meta: SempMeta;
}

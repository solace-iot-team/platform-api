/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnMqttSessionSubscription } from './MsgVpnMqttSessionSubscription';
import type { MsgVpnMqttSessionSubscriptionLinks } from './MsgVpnMqttSessionSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionSubscriptionsResponse = {
    data?: Array<MsgVpnMqttSessionSubscription>;
    links?: Array<MsgVpnMqttSessionSubscriptionLinks>;
    meta: SempMeta;
}

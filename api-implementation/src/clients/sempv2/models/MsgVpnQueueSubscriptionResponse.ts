/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnQueueSubscription } from './MsgVpnQueueSubscription';
import type { MsgVpnQueueSubscriptionLinks } from './MsgVpnQueueSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueSubscriptionResponse = {
    data?: MsgVpnQueueSubscription;
    links?: MsgVpnQueueSubscriptionLinks;
    meta: SempMeta;
}

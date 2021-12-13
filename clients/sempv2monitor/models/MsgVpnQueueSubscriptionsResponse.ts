/* eslint-disable */


import type { MsgVpnQueueSubscription } from './MsgVpnQueueSubscription';
import type { MsgVpnQueueSubscriptionCollections } from './MsgVpnQueueSubscriptionCollections';
import type { MsgVpnQueueSubscriptionLinks } from './MsgVpnQueueSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueSubscriptionsResponse = {
    collections?: Array<MsgVpnQueueSubscriptionCollections>;
    data?: Array<MsgVpnQueueSubscription>;
    links?: Array<MsgVpnQueueSubscriptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnQueueSubscriptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueSubscriptionsResponse';


}
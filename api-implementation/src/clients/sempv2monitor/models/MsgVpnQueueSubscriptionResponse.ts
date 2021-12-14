/* eslint-disable */


import type { MsgVpnQueueSubscription } from './MsgVpnQueueSubscription';
import type { MsgVpnQueueSubscriptionCollections } from './MsgVpnQueueSubscriptionCollections';
import type { MsgVpnQueueSubscriptionLinks } from './MsgVpnQueueSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueSubscriptionResponse = {
    collections?: MsgVpnQueueSubscriptionCollections;
    data?: MsgVpnQueueSubscription;
    links?: MsgVpnQueueSubscriptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnQueueSubscriptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueSubscriptionResponse';


}
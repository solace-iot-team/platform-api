/* eslint-disable */


import type { MsgVpnQueueSubscription } from './MsgVpnQueueSubscription';
import type { MsgVpnQueueSubscriptionLinks } from './MsgVpnQueueSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueSubscriptionResponse = {
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
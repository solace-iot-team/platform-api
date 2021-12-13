/* eslint-disable */


import type { MsgVpnClientSubscription } from './MsgVpnClientSubscription';
import type { MsgVpnClientSubscriptionCollections } from './MsgVpnClientSubscriptionCollections';
import type { MsgVpnClientSubscriptionLinks } from './MsgVpnClientSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientSubscriptionsResponse = {
    collections?: Array<MsgVpnClientSubscriptionCollections>;
    data?: Array<MsgVpnClientSubscription>;
    links?: Array<MsgVpnClientSubscriptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientSubscriptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientSubscriptionsResponse';


}
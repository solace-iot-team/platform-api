/* eslint-disable */


import type { MsgVpnClientSubscription } from './MsgVpnClientSubscription';
import type { MsgVpnClientSubscriptionCollections } from './MsgVpnClientSubscriptionCollections';
import type { MsgVpnClientSubscriptionLinks } from './MsgVpnClientSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientSubscriptionResponse = {
    collections?: MsgVpnClientSubscriptionCollections;
    data?: MsgVpnClientSubscription;
    links?: MsgVpnClientSubscriptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientSubscriptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientSubscriptionResponse';


}
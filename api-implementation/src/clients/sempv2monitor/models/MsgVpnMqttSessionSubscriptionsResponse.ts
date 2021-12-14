/* eslint-disable */


import type { MsgVpnMqttSessionSubscription } from './MsgVpnMqttSessionSubscription';
import type { MsgVpnMqttSessionSubscriptionCollections } from './MsgVpnMqttSessionSubscriptionCollections';
import type { MsgVpnMqttSessionSubscriptionLinks } from './MsgVpnMqttSessionSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionSubscriptionsResponse = {
    collections?: Array<MsgVpnMqttSessionSubscriptionCollections>;
    data?: Array<MsgVpnMqttSessionSubscription>;
    links?: Array<MsgVpnMqttSessionSubscriptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnMqttSessionSubscriptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionSubscriptionsResponse';


}
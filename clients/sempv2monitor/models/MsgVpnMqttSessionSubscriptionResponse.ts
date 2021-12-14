/* eslint-disable */


import type { MsgVpnMqttSessionSubscription } from './MsgVpnMqttSessionSubscription';
import type { MsgVpnMqttSessionSubscriptionCollections } from './MsgVpnMqttSessionSubscriptionCollections';
import type { MsgVpnMqttSessionSubscriptionLinks } from './MsgVpnMqttSessionSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionSubscriptionResponse = {
    collections?: MsgVpnMqttSessionSubscriptionCollections;
    data?: MsgVpnMqttSessionSubscription;
    links?: MsgVpnMqttSessionSubscriptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnMqttSessionSubscriptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionSubscriptionResponse';


}
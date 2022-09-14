/* eslint-disable */


import type { MsgVpnReplayLogTopicFilterSubscription } from './MsgVpnReplayLogTopicFilterSubscription';
import type { MsgVpnReplayLogTopicFilterSubscriptionLinks } from './MsgVpnReplayLogTopicFilterSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogTopicFilterSubscriptionsResponse = {
    data?: Array<MsgVpnReplayLogTopicFilterSubscription>;
    links?: Array<MsgVpnReplayLogTopicFilterSubscriptionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnReplayLogTopicFilterSubscriptionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogTopicFilterSubscriptionsResponse';


}
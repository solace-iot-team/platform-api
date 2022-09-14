/* eslint-disable */


import type { MsgVpnReplayLogTopicFilterSubscription } from './MsgVpnReplayLogTopicFilterSubscription';
import type { MsgVpnReplayLogTopicFilterSubscriptionLinks } from './MsgVpnReplayLogTopicFilterSubscriptionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnReplayLogTopicFilterSubscriptionResponse = {
    data?: MsgVpnReplayLogTopicFilterSubscription;
    links?: MsgVpnReplayLogTopicFilterSubscriptionLinks;
    meta: SempMeta;
}

export namespace MsgVpnReplayLogTopicFilterSubscriptionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLogTopicFilterSubscriptionResponse';


}
/* eslint-disable */


import type { MsgVpnRestDeliveryPointCollectionsQueuebindings } from './MsgVpnRestDeliveryPointCollectionsQueuebindings';
import type { MsgVpnRestDeliveryPointCollectionsRestconsumers } from './MsgVpnRestDeliveryPointCollectionsRestconsumers';

export type MsgVpnRestDeliveryPointCollections = {
    queueBindings?: MsgVpnRestDeliveryPointCollectionsQueuebindings;
    restConsumers?: MsgVpnRestDeliveryPointCollectionsRestconsumers;
}

export namespace MsgVpnRestDeliveryPointCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointCollections';


}
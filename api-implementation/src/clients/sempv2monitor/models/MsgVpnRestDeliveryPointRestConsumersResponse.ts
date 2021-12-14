/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumer } from './MsgVpnRestDeliveryPointRestConsumer';
import type { MsgVpnRestDeliveryPointRestConsumerCollections } from './MsgVpnRestDeliveryPointRestConsumerCollections';
import type { MsgVpnRestDeliveryPointRestConsumerLinks } from './MsgVpnRestDeliveryPointRestConsumerLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointRestConsumersResponse = {
    collections?: Array<MsgVpnRestDeliveryPointRestConsumerCollections>;
    data?: Array<MsgVpnRestDeliveryPointRestConsumer>;
    links?: Array<MsgVpnRestDeliveryPointRestConsumerLinks>;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointRestConsumersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumersResponse';


}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnRestDeliveryPointRestConsumer } from './MsgVpnRestDeliveryPointRestConsumer';
import type { MsgVpnRestDeliveryPointRestConsumerLinks } from './MsgVpnRestDeliveryPointRestConsumerLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnRestDeliveryPointRestConsumersResponse {
    data?: Array<MsgVpnRestDeliveryPointRestConsumer>;
    links?: Array<MsgVpnRestDeliveryPointRestConsumerLinks>;
    meta: SempMeta;
}

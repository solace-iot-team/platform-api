/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnRestDeliveryPointQueueBinding } from './MsgVpnRestDeliveryPointQueueBinding';
import type { MsgVpnRestDeliveryPointQueueBindingLinks } from './MsgVpnRestDeliveryPointQueueBindingLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnRestDeliveryPointQueueBindingResponse {
    data?: MsgVpnRestDeliveryPointQueueBinding;
    links?: MsgVpnRestDeliveryPointQueueBindingLinks;
    meta: SempMeta;
}

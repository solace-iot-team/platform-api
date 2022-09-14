/* eslint-disable */


import type { MsgVpnRestDeliveryPointQueueBindingRequestHeader } from './MsgVpnRestDeliveryPointQueueBindingRequestHeader';
import type { MsgVpnRestDeliveryPointQueueBindingRequestHeaderLinks } from './MsgVpnRestDeliveryPointQueueBindingRequestHeaderLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointQueueBindingRequestHeadersResponse = {
    data?: Array<MsgVpnRestDeliveryPointQueueBindingRequestHeader>;
    links?: Array<MsgVpnRestDeliveryPointQueueBindingRequestHeaderLinks>;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointQueueBindingRequestHeadersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBindingRequestHeadersResponse';


}
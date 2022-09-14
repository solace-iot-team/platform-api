/* eslint-disable */


import type { MsgVpnRestDeliveryPointQueueBindingRequestHeader } from './MsgVpnRestDeliveryPointQueueBindingRequestHeader';
import type { MsgVpnRestDeliveryPointQueueBindingRequestHeaderLinks } from './MsgVpnRestDeliveryPointQueueBindingRequestHeaderLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointQueueBindingRequestHeaderResponse = {
    data?: MsgVpnRestDeliveryPointQueueBindingRequestHeader;
    links?: MsgVpnRestDeliveryPointQueueBindingRequestHeaderLinks;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointQueueBindingRequestHeaderResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBindingRequestHeaderResponse';


}
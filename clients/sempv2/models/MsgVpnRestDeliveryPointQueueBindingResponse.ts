/* eslint-disable */


import type { MsgVpnRestDeliveryPointQueueBinding } from './MsgVpnRestDeliveryPointQueueBinding';
import type { MsgVpnRestDeliveryPointQueueBindingLinks } from './MsgVpnRestDeliveryPointQueueBindingLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointQueueBindingResponse = {
    data?: MsgVpnRestDeliveryPointQueueBinding;
    links?: MsgVpnRestDeliveryPointQueueBindingLinks;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointQueueBindingResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBindingResponse';


}
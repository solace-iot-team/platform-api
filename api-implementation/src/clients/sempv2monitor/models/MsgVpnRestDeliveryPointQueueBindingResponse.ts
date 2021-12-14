/* eslint-disable */


import type { MsgVpnRestDeliveryPointQueueBinding } from './MsgVpnRestDeliveryPointQueueBinding';
import type { MsgVpnRestDeliveryPointQueueBindingCollections } from './MsgVpnRestDeliveryPointQueueBindingCollections';
import type { MsgVpnRestDeliveryPointQueueBindingLinks } from './MsgVpnRestDeliveryPointQueueBindingLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointQueueBindingResponse = {
    collections?: MsgVpnRestDeliveryPointQueueBindingCollections;
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
/* eslint-disable */


import type { MsgVpnQueuePriority } from './MsgVpnQueuePriority';
import type { MsgVpnQueuePriorityCollections } from './MsgVpnQueuePriorityCollections';
import type { MsgVpnQueuePriorityLinks } from './MsgVpnQueuePriorityLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueuePriorityResponse = {
    collections?: MsgVpnQueuePriorityCollections;
    data?: MsgVpnQueuePriority;
    links?: MsgVpnQueuePriorityLinks;
    meta: SempMeta;
}

export namespace MsgVpnQueuePriorityResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueuePriorityResponse';


}
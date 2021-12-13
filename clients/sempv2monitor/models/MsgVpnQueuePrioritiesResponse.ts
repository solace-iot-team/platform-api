/* eslint-disable */


import type { MsgVpnQueuePriority } from './MsgVpnQueuePriority';
import type { MsgVpnQueuePriorityCollections } from './MsgVpnQueuePriorityCollections';
import type { MsgVpnQueuePriorityLinks } from './MsgVpnQueuePriorityLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueuePrioritiesResponse = {
    collections?: Array<MsgVpnQueuePriorityCollections>;
    data?: Array<MsgVpnQueuePriority>;
    links?: Array<MsgVpnQueuePriorityLinks>;
    meta: SempMeta;
}

export namespace MsgVpnQueuePrioritiesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueuePrioritiesResponse';


}
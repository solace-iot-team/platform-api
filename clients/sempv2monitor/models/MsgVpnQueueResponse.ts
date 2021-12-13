/* eslint-disable */


import type { MsgVpnQueue } from './MsgVpnQueue';
import type { MsgVpnQueueCollections } from './MsgVpnQueueCollections';
import type { MsgVpnQueueLinks } from './MsgVpnQueueLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueResponse = {
    collections?: MsgVpnQueueCollections;
    data?: MsgVpnQueue;
    links?: MsgVpnQueueLinks;
    meta: SempMeta;
}

export namespace MsgVpnQueueResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueResponse';


}
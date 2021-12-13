/* eslint-disable */


import type { MsgVpnQueue } from './MsgVpnQueue';
import type { MsgVpnQueueCollections } from './MsgVpnQueueCollections';
import type { MsgVpnQueueLinks } from './MsgVpnQueueLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueuesResponse = {
    collections?: Array<MsgVpnQueueCollections>;
    data?: Array<MsgVpnQueue>;
    links?: Array<MsgVpnQueueLinks>;
    meta: SempMeta;
}

export namespace MsgVpnQueuesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueuesResponse';


}
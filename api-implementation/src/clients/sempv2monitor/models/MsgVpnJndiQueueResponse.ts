/* eslint-disable */


import type { MsgVpnJndiQueue } from './MsgVpnJndiQueue';
import type { MsgVpnJndiQueueCollections } from './MsgVpnJndiQueueCollections';
import type { MsgVpnJndiQueueLinks } from './MsgVpnJndiQueueLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnJndiQueueResponse = {
    collections?: MsgVpnJndiQueueCollections;
    data?: MsgVpnJndiQueue;
    links?: MsgVpnJndiQueueLinks;
    meta: SempMeta;
}

export namespace MsgVpnJndiQueueResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiQueueResponse';


}
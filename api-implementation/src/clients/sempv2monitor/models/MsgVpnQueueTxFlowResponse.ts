/* eslint-disable */


import type { MsgVpnQueueTxFlow } from './MsgVpnQueueTxFlow';
import type { MsgVpnQueueTxFlowCollections } from './MsgVpnQueueTxFlowCollections';
import type { MsgVpnQueueTxFlowLinks } from './MsgVpnQueueTxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueTxFlowResponse = {
    collections?: MsgVpnQueueTxFlowCollections;
    data?: MsgVpnQueueTxFlow;
    links?: MsgVpnQueueTxFlowLinks;
    meta: SempMeta;
}

export namespace MsgVpnQueueTxFlowResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueTxFlowResponse';


}
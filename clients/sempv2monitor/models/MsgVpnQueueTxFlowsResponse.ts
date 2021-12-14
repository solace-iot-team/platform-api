/* eslint-disable */


import type { MsgVpnQueueTxFlow } from './MsgVpnQueueTxFlow';
import type { MsgVpnQueueTxFlowCollections } from './MsgVpnQueueTxFlowCollections';
import type { MsgVpnQueueTxFlowLinks } from './MsgVpnQueueTxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueTxFlowsResponse = {
    collections?: Array<MsgVpnQueueTxFlowCollections>;
    data?: Array<MsgVpnQueueTxFlow>;
    links?: Array<MsgVpnQueueTxFlowLinks>;
    meta: SempMeta;
}

export namespace MsgVpnQueueTxFlowsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueTxFlowsResponse';


}
/* eslint-disable */


import type { MsgVpnClientTxFlow } from './MsgVpnClientTxFlow';
import type { MsgVpnClientTxFlowCollections } from './MsgVpnClientTxFlowCollections';
import type { MsgVpnClientTxFlowLinks } from './MsgVpnClientTxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientTxFlowResponse = {
    collections?: MsgVpnClientTxFlowCollections;
    data?: MsgVpnClientTxFlow;
    links?: MsgVpnClientTxFlowLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientTxFlowResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientTxFlowResponse';


}
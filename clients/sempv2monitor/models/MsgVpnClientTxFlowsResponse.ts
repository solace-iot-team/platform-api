/* eslint-disable */


import type { MsgVpnClientTxFlow } from './MsgVpnClientTxFlow';
import type { MsgVpnClientTxFlowCollections } from './MsgVpnClientTxFlowCollections';
import type { MsgVpnClientTxFlowLinks } from './MsgVpnClientTxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientTxFlowsResponse = {
    collections?: Array<MsgVpnClientTxFlowCollections>;
    data?: Array<MsgVpnClientTxFlow>;
    links?: Array<MsgVpnClientTxFlowLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientTxFlowsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientTxFlowsResponse';


}
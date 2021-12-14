/* eslint-disable */


import type { MsgVpnClientRxFlow } from './MsgVpnClientRxFlow';
import type { MsgVpnClientRxFlowCollections } from './MsgVpnClientRxFlowCollections';
import type { MsgVpnClientRxFlowLinks } from './MsgVpnClientRxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientRxFlowsResponse = {
    collections?: Array<MsgVpnClientRxFlowCollections>;
    data?: Array<MsgVpnClientRxFlow>;
    links?: Array<MsgVpnClientRxFlowLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientRxFlowsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientRxFlowsResponse';


}
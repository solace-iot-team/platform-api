/* eslint-disable */


import type { MsgVpnClientRxFlow } from './MsgVpnClientRxFlow';
import type { MsgVpnClientRxFlowCollections } from './MsgVpnClientRxFlowCollections';
import type { MsgVpnClientRxFlowLinks } from './MsgVpnClientRxFlowLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientRxFlowResponse = {
    collections?: MsgVpnClientRxFlowCollections;
    data?: MsgVpnClientRxFlow;
    links?: MsgVpnClientRxFlowLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientRxFlowResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientRxFlowResponse';


}
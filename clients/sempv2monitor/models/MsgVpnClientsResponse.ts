/* eslint-disable */


import type { MsgVpnClient } from './MsgVpnClient';
import type { MsgVpnClientCollections } from './MsgVpnClientCollections';
import type { MsgVpnClientLinks } from './MsgVpnClientLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientsResponse = {
    collections?: Array<MsgVpnClientCollections>;
    data?: Array<MsgVpnClient>;
    links?: Array<MsgVpnClientLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientsResponse';


}
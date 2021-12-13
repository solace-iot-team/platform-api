/* eslint-disable */


import type { MsgVpnClientConnection } from './MsgVpnClientConnection';
import type { MsgVpnClientConnectionCollections } from './MsgVpnClientConnectionCollections';
import type { MsgVpnClientConnectionLinks } from './MsgVpnClientConnectionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientConnectionsResponse = {
    collections?: Array<MsgVpnClientConnectionCollections>;
    data?: Array<MsgVpnClientConnection>;
    links?: Array<MsgVpnClientConnectionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientConnectionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientConnectionsResponse';


}
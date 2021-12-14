/* eslint-disable */


import type { MsgVpnClientConnection } from './MsgVpnClientConnection';
import type { MsgVpnClientConnectionCollections } from './MsgVpnClientConnectionCollections';
import type { MsgVpnClientConnectionLinks } from './MsgVpnClientConnectionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientConnectionResponse = {
    collections?: MsgVpnClientConnectionCollections;
    data?: MsgVpnClientConnection;
    links?: MsgVpnClientConnectionLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientConnectionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientConnectionResponse';


}
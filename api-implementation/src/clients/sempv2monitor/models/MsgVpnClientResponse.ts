/* eslint-disable */


import type { MsgVpnClient } from './MsgVpnClient';
import type { MsgVpnClientCollections } from './MsgVpnClientCollections';
import type { MsgVpnClientLinks } from './MsgVpnClientLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientResponse = {
    collections?: MsgVpnClientCollections;
    data?: MsgVpnClient;
    links?: MsgVpnClientLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientResponse';


}
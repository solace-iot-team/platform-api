/* eslint-disable */


import type { MsgVpnClientUsername } from './MsgVpnClientUsername';
import type { MsgVpnClientUsernameCollections } from './MsgVpnClientUsernameCollections';
import type { MsgVpnClientUsernameLinks } from './MsgVpnClientUsernameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientUsernamesResponse = {
    collections?: Array<MsgVpnClientUsernameCollections>;
    data?: Array<MsgVpnClientUsername>;
    links?: Array<MsgVpnClientUsernameLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientUsernamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsernamesResponse';


}
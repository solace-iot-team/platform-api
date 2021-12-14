/* eslint-disable */


import type { MsgVpnClientUsername } from './MsgVpnClientUsername';
import type { MsgVpnClientUsernameCollections } from './MsgVpnClientUsernameCollections';
import type { MsgVpnClientUsernameLinks } from './MsgVpnClientUsernameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientUsernameResponse = {
    collections?: MsgVpnClientUsernameCollections;
    data?: MsgVpnClientUsername;
    links?: MsgVpnClientUsernameLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientUsernameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsernameResponse';


}
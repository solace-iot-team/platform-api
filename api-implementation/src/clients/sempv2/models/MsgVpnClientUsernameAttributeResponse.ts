/* eslint-disable */


import type { MsgVpnClientUsernameAttribute } from './MsgVpnClientUsernameAttribute';
import type { MsgVpnClientUsernameAttributeLinks } from './MsgVpnClientUsernameAttributeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientUsernameAttributeResponse = {
    data?: MsgVpnClientUsernameAttribute;
    links?: MsgVpnClientUsernameAttributeLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientUsernameAttributeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsernameAttributeResponse';


}
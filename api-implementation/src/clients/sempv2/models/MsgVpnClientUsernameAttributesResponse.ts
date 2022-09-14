/* eslint-disable */


import type { MsgVpnClientUsernameAttribute } from './MsgVpnClientUsernameAttribute';
import type { MsgVpnClientUsernameAttributeLinks } from './MsgVpnClientUsernameAttributeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientUsernameAttributesResponse = {
    data?: Array<MsgVpnClientUsernameAttribute>;
    links?: Array<MsgVpnClientUsernameAttributeLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientUsernameAttributesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsernameAttributesResponse';


}
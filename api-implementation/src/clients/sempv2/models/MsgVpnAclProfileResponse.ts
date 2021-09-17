/* eslint-disable */


import type { MsgVpnAclProfile } from './MsgVpnAclProfile';
import type { MsgVpnAclProfileLinks } from './MsgVpnAclProfileLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfileResponse = {
    data?: MsgVpnAclProfile;
    links?: MsgVpnAclProfileLinks;
    meta: SempMeta;
}

export namespace MsgVpnAclProfileResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileResponse';


}
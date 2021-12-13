/* eslint-disable */


import type { MsgVpnAclProfile } from './MsgVpnAclProfile';
import type { MsgVpnAclProfileCollections } from './MsgVpnAclProfileCollections';
import type { MsgVpnAclProfileLinks } from './MsgVpnAclProfileLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAclProfilesResponse = {
    collections?: Array<MsgVpnAclProfileCollections>;
    data?: Array<MsgVpnAclProfile>;
    links?: Array<MsgVpnAclProfileLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAclProfilesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfilesResponse';


}
/* eslint-disable */


import type { MsgVpnClientProfile } from './MsgVpnClientProfile';
import type { MsgVpnClientProfileCollections } from './MsgVpnClientProfileCollections';
import type { MsgVpnClientProfileLinks } from './MsgVpnClientProfileLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientProfileResponse = {
    collections?: MsgVpnClientProfileCollections;
    data?: MsgVpnClientProfile;
    links?: MsgVpnClientProfileLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientProfileResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientProfileResponse';


}
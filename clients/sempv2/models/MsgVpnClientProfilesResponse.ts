/* eslint-disable */


import type { MsgVpnClientProfile } from './MsgVpnClientProfile';
import type { MsgVpnClientProfileLinks } from './MsgVpnClientProfileLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientProfilesResponse = {
    data?: Array<MsgVpnClientProfile>;
    links?: Array<MsgVpnClientProfileLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientProfilesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientProfilesResponse';


}
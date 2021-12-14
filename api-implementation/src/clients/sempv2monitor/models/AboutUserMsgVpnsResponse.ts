/* eslint-disable */


import type { AboutUserMsgVpn } from './AboutUserMsgVpn';
import type { AboutUserMsgVpnCollections } from './AboutUserMsgVpnCollections';
import type { AboutUserMsgVpnLinks } from './AboutUserMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type AboutUserMsgVpnsResponse = {
    collections?: Array<AboutUserMsgVpnCollections>;
    data?: Array<AboutUserMsgVpn>;
    links?: Array<AboutUserMsgVpnLinks>;
    meta: SempMeta;
}

export namespace AboutUserMsgVpnsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutUserMsgVpnsResponse';


}
/* eslint-disable */


import type { AboutUserMsgVpn } from './AboutUserMsgVpn';
import type { AboutUserMsgVpnLinks } from './AboutUserMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type AboutUserMsgVpnResponse = {
    data?: AboutUserMsgVpn;
    links?: AboutUserMsgVpnLinks;
    meta: SempMeta;
}

export namespace AboutUserMsgVpnResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutUserMsgVpnResponse';


}
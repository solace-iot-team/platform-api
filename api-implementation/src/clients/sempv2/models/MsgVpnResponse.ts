/* eslint-disable */


import type { MsgVpn } from './MsgVpn';
import type { MsgVpnLinks } from './MsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnResponse = {
    data?: MsgVpn;
    links?: MsgVpnLinks;
    meta: SempMeta;
}

export namespace MsgVpnResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnResponse';


}
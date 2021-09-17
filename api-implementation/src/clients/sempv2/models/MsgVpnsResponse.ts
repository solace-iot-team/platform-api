/* eslint-disable */


import type { MsgVpn } from './MsgVpn';
import type { MsgVpnLinks } from './MsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnsResponse = {
    data?: Array<MsgVpn>;
    links?: Array<MsgVpnLinks>;
    meta: SempMeta;
}

export namespace MsgVpnsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnsResponse';


}
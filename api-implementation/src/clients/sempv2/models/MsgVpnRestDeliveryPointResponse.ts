/* eslint-disable */


import type { MsgVpnRestDeliveryPoint } from './MsgVpnRestDeliveryPoint';
import type { MsgVpnRestDeliveryPointLinks } from './MsgVpnRestDeliveryPointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointResponse = {
    data?: MsgVpnRestDeliveryPoint;
    links?: MsgVpnRestDeliveryPointLinks;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointResponse';


}
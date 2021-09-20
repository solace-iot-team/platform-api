/* eslint-disable */


import type { MsgVpnRestDeliveryPoint } from './MsgVpnRestDeliveryPoint';
import type { MsgVpnRestDeliveryPointLinks } from './MsgVpnRestDeliveryPointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointsResponse = {
    data?: Array<MsgVpnRestDeliveryPoint>;
    links?: Array<MsgVpnRestDeliveryPointLinks>;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointsResponse';


}
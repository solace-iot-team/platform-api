/* eslint-disable */


import type { MsgVpnRestDeliveryPoint } from './MsgVpnRestDeliveryPoint';
import type { MsgVpnRestDeliveryPointCollections } from './MsgVpnRestDeliveryPointCollections';
import type { MsgVpnRestDeliveryPointLinks } from './MsgVpnRestDeliveryPointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointsResponse = {
    collections?: Array<MsgVpnRestDeliveryPointCollections>;
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
/* eslint-disable */


import type { MsgVpnRestDeliveryPoint } from './MsgVpnRestDeliveryPoint';
import type { MsgVpnRestDeliveryPointCollections } from './MsgVpnRestDeliveryPointCollections';
import type { MsgVpnRestDeliveryPointLinks } from './MsgVpnRestDeliveryPointLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointResponse = {
    collections?: MsgVpnRestDeliveryPointCollections;
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
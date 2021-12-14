/* eslint-disable */


import type { MsgVpnMqttSession } from './MsgVpnMqttSession';
import type { MsgVpnMqttSessionCollections } from './MsgVpnMqttSessionCollections';
import type { MsgVpnMqttSessionLinks } from './MsgVpnMqttSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionsResponse = {
    collections?: Array<MsgVpnMqttSessionCollections>;
    data?: Array<MsgVpnMqttSession>;
    links?: Array<MsgVpnMqttSessionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnMqttSessionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionsResponse';


}
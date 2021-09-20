/* eslint-disable */


import type { MsgVpnMqttSession } from './MsgVpnMqttSession';
import type { MsgVpnMqttSessionLinks } from './MsgVpnMqttSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionsResponse = {
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
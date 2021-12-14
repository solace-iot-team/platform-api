/* eslint-disable */


import type { MsgVpnMqttSession } from './MsgVpnMqttSession';
import type { MsgVpnMqttSessionCollections } from './MsgVpnMqttSessionCollections';
import type { MsgVpnMqttSessionLinks } from './MsgVpnMqttSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnMqttSessionResponse = {
    collections?: MsgVpnMqttSessionCollections;
    data?: MsgVpnMqttSession;
    links?: MsgVpnMqttSessionLinks;
    meta: SempMeta;
}

export namespace MsgVpnMqttSessionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttSessionResponse';


}
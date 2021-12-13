/* eslint-disable */


import type { MsgVpnConfigSyncRemoteNode } from './MsgVpnConfigSyncRemoteNode';
import type { MsgVpnConfigSyncRemoteNodeCollections } from './MsgVpnConfigSyncRemoteNodeCollections';
import type { MsgVpnConfigSyncRemoteNodeLinks } from './MsgVpnConfigSyncRemoteNodeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnConfigSyncRemoteNodeResponse = {
    collections?: MsgVpnConfigSyncRemoteNodeCollections;
    data?: MsgVpnConfigSyncRemoteNode;
    links?: MsgVpnConfigSyncRemoteNodeLinks;
    meta: SempMeta;
}

export namespace MsgVpnConfigSyncRemoteNodeResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnConfigSyncRemoteNodeResponse';


}
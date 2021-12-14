/* eslint-disable */


import type { MsgVpnConfigSyncRemoteNode } from './MsgVpnConfigSyncRemoteNode';
import type { MsgVpnConfigSyncRemoteNodeCollections } from './MsgVpnConfigSyncRemoteNodeCollections';
import type { MsgVpnConfigSyncRemoteNodeLinks } from './MsgVpnConfigSyncRemoteNodeLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnConfigSyncRemoteNodesResponse = {
    collections?: Array<MsgVpnConfigSyncRemoteNodeCollections>;
    data?: Array<MsgVpnConfigSyncRemoteNode>;
    links?: Array<MsgVpnConfigSyncRemoteNodeLinks>;
    meta: SempMeta;
}

export namespace MsgVpnConfigSyncRemoteNodesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnConfigSyncRemoteNodesResponse';


}
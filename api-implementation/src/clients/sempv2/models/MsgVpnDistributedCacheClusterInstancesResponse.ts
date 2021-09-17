/* eslint-disable */


import type { MsgVpnDistributedCacheClusterInstance } from './MsgVpnDistributedCacheClusterInstance';
import type { MsgVpnDistributedCacheClusterInstanceLinks } from './MsgVpnDistributedCacheClusterInstanceLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnDistributedCacheClusterInstancesResponse = {
    data?: Array<MsgVpnDistributedCacheClusterInstance>;
    links?: Array<MsgVpnDistributedCacheClusterInstanceLinks>;
    meta: SempMeta;
}

export namespace MsgVpnDistributedCacheClusterInstancesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstancesResponse';


}
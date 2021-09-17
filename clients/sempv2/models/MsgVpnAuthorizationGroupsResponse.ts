/* eslint-disable */


import type { MsgVpnAuthorizationGroup } from './MsgVpnAuthorizationGroup';
import type { MsgVpnAuthorizationGroupLinks } from './MsgVpnAuthorizationGroupLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthorizationGroupsResponse = {
    data?: Array<MsgVpnAuthorizationGroup>;
    links?: Array<MsgVpnAuthorizationGroupLinks>;
    meta: SempMeta;
}

export namespace MsgVpnAuthorizationGroupsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthorizationGroupsResponse';


}
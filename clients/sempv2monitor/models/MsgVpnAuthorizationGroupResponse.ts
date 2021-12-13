/* eslint-disable */


import type { MsgVpnAuthorizationGroup } from './MsgVpnAuthorizationGroup';
import type { MsgVpnAuthorizationGroupCollections } from './MsgVpnAuthorizationGroupCollections';
import type { MsgVpnAuthorizationGroupLinks } from './MsgVpnAuthorizationGroupLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthorizationGroupResponse = {
    collections?: MsgVpnAuthorizationGroupCollections;
    data?: MsgVpnAuthorizationGroup;
    links?: MsgVpnAuthorizationGroupLinks;
    meta: SempMeta;
}

export namespace MsgVpnAuthorizationGroupResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthorizationGroupResponse';


}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnAuthorizationGroup } from './MsgVpnAuthorizationGroup';
import type { MsgVpnAuthorizationGroupLinks } from './MsgVpnAuthorizationGroupLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnAuthorizationGroupResponse = {
    data?: MsgVpnAuthorizationGroup;
    links?: MsgVpnAuthorizationGroupLinks;
    meta: SempMeta;
}

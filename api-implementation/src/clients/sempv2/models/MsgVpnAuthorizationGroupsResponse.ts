/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnAuthorizationGroup } from './MsgVpnAuthorizationGroup';
import type { MsgVpnAuthorizationGroupLinks } from './MsgVpnAuthorizationGroupLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnAuthorizationGroupsResponse {
    data?: Array<MsgVpnAuthorizationGroup>;
    links?: Array<MsgVpnAuthorizationGroupLinks>;
    meta: SempMeta;
}

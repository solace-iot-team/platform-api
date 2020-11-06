/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnAclProfile } from './MsgVpnAclProfile';
import type { MsgVpnAclProfileLinks } from './MsgVpnAclProfileLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnAclProfileResponse {
    data?: MsgVpnAclProfile;
    links?: MsgVpnAclProfileLinks;
    meta: SempMeta;
}

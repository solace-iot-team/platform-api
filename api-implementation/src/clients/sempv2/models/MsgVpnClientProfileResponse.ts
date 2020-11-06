/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnClientProfile } from './MsgVpnClientProfile';
import type { MsgVpnClientProfileLinks } from './MsgVpnClientProfileLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnClientProfileResponse {
    data?: MsgVpnClientProfile;
    links?: MsgVpnClientProfileLinks;
    meta: SempMeta;
}

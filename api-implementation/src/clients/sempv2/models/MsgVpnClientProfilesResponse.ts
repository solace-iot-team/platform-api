/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpnClientProfile } from './MsgVpnClientProfile';
import type { MsgVpnClientProfileLinks } from './MsgVpnClientProfileLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnClientProfilesResponse {
    data?: Array<MsgVpnClientProfile>;
    links?: Array<MsgVpnClientProfileLinks>;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MsgVpn } from './MsgVpn';
import type { MsgVpnLinks } from './MsgVpnLinks';
import type { SempMeta } from './SempMeta';

export interface MsgVpnResponse {
    data?: MsgVpn;
    links?: MsgVpnLinks;
    meta: SempMeta;
}

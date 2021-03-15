/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpn } from './MsgVpn';
import type { MsgVpnLinks } from './MsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnResponse = {
    data?: MsgVpn;
    links?: MsgVpnLinks;
    meta: SempMeta;
}

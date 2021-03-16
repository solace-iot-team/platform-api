/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AboutUserMsgVpn } from './AboutUserMsgVpn';
import type { AboutUserMsgVpnLinks } from './AboutUserMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export type AboutUserMsgVpnResponse = {
    data?: AboutUserMsgVpn;
    links?: AboutUserMsgVpnLinks;
    meta: SempMeta;
}

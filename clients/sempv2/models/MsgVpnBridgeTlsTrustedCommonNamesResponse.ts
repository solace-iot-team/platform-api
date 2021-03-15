/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnBridgeTlsTrustedCommonName } from './MsgVpnBridgeTlsTrustedCommonName';
import type { MsgVpnBridgeTlsTrustedCommonNameLinks } from './MsgVpnBridgeTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnBridgeTlsTrustedCommonNamesResponse = {
    data?: Array<MsgVpnBridgeTlsTrustedCommonName>;
    links?: Array<MsgVpnBridgeTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

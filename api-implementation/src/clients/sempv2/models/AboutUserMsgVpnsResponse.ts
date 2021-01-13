/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AboutUserMsgVpn } from './AboutUserMsgVpn';
import type { AboutUserMsgVpnLinks } from './AboutUserMsgVpnLinks';
import type { SempMeta } from './SempMeta';

export interface AboutUserMsgVpnsResponse {
    data?: Array<AboutUserMsgVpn>;
    links?: Array<AboutUserMsgVpnLinks>;
    meta: SempMeta;
}

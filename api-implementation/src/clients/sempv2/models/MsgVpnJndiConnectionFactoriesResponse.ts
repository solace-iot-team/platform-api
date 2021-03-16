/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnJndiConnectionFactory } from './MsgVpnJndiConnectionFactory';
import type { MsgVpnJndiConnectionFactoryLinks } from './MsgVpnJndiConnectionFactoryLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnJndiConnectionFactoriesResponse = {
    data?: Array<MsgVpnJndiConnectionFactory>;
    links?: Array<MsgVpnJndiConnectionFactoryLinks>;
    meta: SempMeta;
}

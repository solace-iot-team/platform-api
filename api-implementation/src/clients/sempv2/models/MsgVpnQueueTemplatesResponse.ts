/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnQueueTemplate } from './MsgVpnQueueTemplate';
import type { MsgVpnQueueTemplateLinks } from './MsgVpnQueueTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueTemplatesResponse = {
    data?: Array<MsgVpnQueueTemplate>;
    links?: Array<MsgVpnQueueTemplateLinks>;
    meta: SempMeta;
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MsgVpnQueueTemplate } from './MsgVpnQueueTemplate';
import type { MsgVpnQueueTemplateLinks } from './MsgVpnQueueTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueTemplateResponse = {
    data?: MsgVpnQueueTemplate;
    links?: MsgVpnQueueTemplateLinks;
    meta: SempMeta;
}

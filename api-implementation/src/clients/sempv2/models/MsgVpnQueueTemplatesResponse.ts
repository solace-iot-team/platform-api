/* eslint-disable */


import type { MsgVpnQueueTemplate } from './MsgVpnQueueTemplate';
import type { MsgVpnQueueTemplateLinks } from './MsgVpnQueueTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueTemplatesResponse = {
    data?: Array<MsgVpnQueueTemplate>;
    links?: Array<MsgVpnQueueTemplateLinks>;
    meta: SempMeta;
}

export namespace MsgVpnQueueTemplatesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueTemplatesResponse';


}
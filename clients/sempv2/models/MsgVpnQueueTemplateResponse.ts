/* eslint-disable */


import type { MsgVpnQueueTemplate } from './MsgVpnQueueTemplate';
import type { MsgVpnQueueTemplateLinks } from './MsgVpnQueueTemplateLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnQueueTemplateResponse = {
    data?: MsgVpnQueueTemplate;
    links?: MsgVpnQueueTemplateLinks;
    meta: SempMeta;
}

export namespace MsgVpnQueueTemplateResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueueTemplateResponse';


}
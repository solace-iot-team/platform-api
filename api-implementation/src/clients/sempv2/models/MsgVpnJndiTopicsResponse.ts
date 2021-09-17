/* eslint-disable */


import type { MsgVpnJndiTopic } from './MsgVpnJndiTopic';
import type { MsgVpnJndiTopicLinks } from './MsgVpnJndiTopicLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnJndiTopicsResponse = {
    data?: Array<MsgVpnJndiTopic>;
    links?: Array<MsgVpnJndiTopicLinks>;
    meta: SempMeta;
}

export namespace MsgVpnJndiTopicsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiTopicsResponse';


}
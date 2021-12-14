/* eslint-disable */


import type { MsgVpnClientTransactedSession } from './MsgVpnClientTransactedSession';
import type { MsgVpnClientTransactedSessionCollections } from './MsgVpnClientTransactedSessionCollections';
import type { MsgVpnClientTransactedSessionLinks } from './MsgVpnClientTransactedSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientTransactedSessionResponse = {
    collections?: MsgVpnClientTransactedSessionCollections;
    data?: MsgVpnClientTransactedSession;
    links?: MsgVpnClientTransactedSessionLinks;
    meta: SempMeta;
}

export namespace MsgVpnClientTransactedSessionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientTransactedSessionResponse';


}
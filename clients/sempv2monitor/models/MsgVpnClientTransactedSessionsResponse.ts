/* eslint-disable */


import type { MsgVpnClientTransactedSession } from './MsgVpnClientTransactedSession';
import type { MsgVpnClientTransactedSessionCollections } from './MsgVpnClientTransactedSessionCollections';
import type { MsgVpnClientTransactedSessionLinks } from './MsgVpnClientTransactedSessionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnClientTransactedSessionsResponse = {
    collections?: Array<MsgVpnClientTransactedSessionCollections>;
    data?: Array<MsgVpnClientTransactedSession>;
    links?: Array<MsgVpnClientTransactedSessionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnClientTransactedSessionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientTransactedSessionsResponse';


}
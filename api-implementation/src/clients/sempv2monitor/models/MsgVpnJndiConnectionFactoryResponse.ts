/* eslint-disable */


import type { MsgVpnJndiConnectionFactory } from './MsgVpnJndiConnectionFactory';
import type { MsgVpnJndiConnectionFactoryCollections } from './MsgVpnJndiConnectionFactoryCollections';
import type { MsgVpnJndiConnectionFactoryLinks } from './MsgVpnJndiConnectionFactoryLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnJndiConnectionFactoryResponse = {
    collections?: MsgVpnJndiConnectionFactoryCollections;
    data?: MsgVpnJndiConnectionFactory;
    links?: MsgVpnJndiConnectionFactoryLinks;
    meta: SempMeta;
}

export namespace MsgVpnJndiConnectionFactoryResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiConnectionFactoryResponse';


}
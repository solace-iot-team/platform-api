/* eslint-disable */


import type { MsgVpnJndiConnectionFactory } from './MsgVpnJndiConnectionFactory';
import type { MsgVpnJndiConnectionFactoryCollections } from './MsgVpnJndiConnectionFactoryCollections';
import type { MsgVpnJndiConnectionFactoryLinks } from './MsgVpnJndiConnectionFactoryLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnJndiConnectionFactoriesResponse = {
    collections?: Array<MsgVpnJndiConnectionFactoryCollections>;
    data?: Array<MsgVpnJndiConnectionFactory>;
    links?: Array<MsgVpnJndiConnectionFactoryLinks>;
    meta: SempMeta;
}

export namespace MsgVpnJndiConnectionFactoriesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiConnectionFactoriesResponse';


}
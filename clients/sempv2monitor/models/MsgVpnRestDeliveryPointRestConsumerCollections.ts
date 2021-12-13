/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumerCollectionsOauthjwtclaims } from './MsgVpnRestDeliveryPointRestConsumerCollectionsOauthjwtclaims';
import type { MsgVpnRestDeliveryPointRestConsumerCollectionsTlstrustedcommonnames } from './MsgVpnRestDeliveryPointRestConsumerCollectionsTlstrustedcommonnames';

export type MsgVpnRestDeliveryPointRestConsumerCollections = {
    oauthJwtClaims?: MsgVpnRestDeliveryPointRestConsumerCollectionsOauthjwtclaims;
    tlsTrustedCommonNames?: MsgVpnRestDeliveryPointRestConsumerCollectionsTlstrustedcommonnames;
}

export namespace MsgVpnRestDeliveryPointRestConsumerCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerCollections';


}
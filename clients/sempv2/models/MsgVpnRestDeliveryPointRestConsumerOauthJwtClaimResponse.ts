/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim } from './MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim';
import type { MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimLinks } from './MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimResponse = {
    data?: MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim;
    links?: MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimLinks;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimResponse';


}
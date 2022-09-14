/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim } from './MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim';
import type { MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimLinks } from './MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimsResponse = {
    data?: Array<MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim>;
    links?: Array<MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimLinks>;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerOauthJwtClaimsResponse';


}
/* eslint-disable */


export type MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the additional claim. Cannot be "exp", "iat", or "jti".
     */
    oauthJwtClaimName?: string;
    /**
     * The value of the additional claim.
     */
    oauthJwtClaimValue?: string;
    /**
     * The name of the REST Consumer.
     */
    restConsumerName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
}

export namespace MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerOauthJwtClaim';


}
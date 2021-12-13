/* eslint-disable */


export type MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName = {
    /**
     * The name of the Message VPN. Deprecated since 2.17. Common Name validation has been replaced by Server Certificate Name validation.
     */
    msgVpnName?: string;
    /**
     * The name of the REST Consumer. Deprecated since 2.17. Common Name validation has been replaced by Server Certificate Name validation.
     */
    restConsumerName?: string;
    /**
     * The name of the REST Delivery Point. Deprecated since 2.17. Common Name validation has been replaced by Server Certificate Name validation.
     */
    restDeliveryPointName?: string;
    /**
     * The expected trusted common name of the remote certificate. Deprecated since 2.17. Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsTrustedCommonName?: string;
}

export namespace MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName';


}
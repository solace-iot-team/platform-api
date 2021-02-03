/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName {
    /**
     * The name of the Message VPN. Deprecated since (will be deprecated in next SEMP version). Common Name validation has been replaced by Server Certificate Name validation.
     */
    msgVpnName?: string;
    /**
     * The name of the REST Consumer. Deprecated since (will be deprecated in next SEMP version). Common Name validation has been replaced by Server Certificate Name validation.
     */
    restConsumerName?: string;
    /**
     * The name of the REST Delivery Point. Deprecated since (will be deprecated in next SEMP version). Common Name validation has been replaced by Server Certificate Name validation.
     */
    restDeliveryPointName?: string;
    /**
     * The expected trusted common name of the remote certificate. Deprecated since (will be deprecated in next SEMP version). Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsTrustedCommonName?: string;
}

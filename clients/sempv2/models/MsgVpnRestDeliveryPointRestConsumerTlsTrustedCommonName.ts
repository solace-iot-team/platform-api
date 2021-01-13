/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the REST Consumer.
     */
    restConsumerName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
    /**
     * The expected trusted common name of the remote certificate.
     */
    tlsTrustedCommonName?: string;
}

/* eslint-disable */


/**
 * The counters for the REST Consumer. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpnRestDeliveryPointRestConsumer object.
 */
export type MsgVpnRestDeliveryPointRestConsumerCounter = {
    /**
     * The number of HTTP request messages transmitted to the REST Consumer to close the connection. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpRequestConnectionCloseTxMsgCount?: number;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer that are waiting for a response. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpRequestOutstandingTxMsgCount?: number;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer that have timed out. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpRequestTimedOutTxMsgCount?: number;
    /**
     * The amount of HTTP request messages transmitted to the REST Consumer, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpRequestTxByteCount?: number;
    /**
     * The number of HTTP request messages transmitted to the REST Consumer. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpRequestTxMsgCount?: number;
    /**
     * The number of HTTP client/server error response messages received from the REST Consumer. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpResponseErrorRxMsgCount?: number;
    /**
     * The amount of HTTP response messages received from the REST Consumer, in bytes (B). Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpResponseRxByteCount?: number;
    /**
     * The number of HTTP response messages received from the REST Consumer. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpResponseRxMsgCount?: number;
    /**
     * The number of HTTP successful response messages received from the REST Consumer. Deprecated since 2.13. This attribute has been moved to the MsgVpnRestDeliveryPointRestConsumer object.
     */
    httpResponseSuccessRxMsgCount?: number;
}

export namespace MsgVpnRestDeliveryPointRestConsumerCounter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerCounter';


}
/* eslint-disable */


/**
 * The rates associated with the Cache Instance. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpnDistributedCacheClusterInstance object.
 */
export type MsgVpnDistributedCacheClusterInstanceRate = {
    /**
     * The peak of the one minute average of the data message rate received by the Cache Instance, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageDataRxBytePeakRate?: number;
    /**
     * The one minute average of the data message rate received by the Cache Instance, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageDataRxByteRate?: number;
    /**
     * The peak of the one minute average of the data message rate received by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageDataRxMsgPeakRate?: number;
    /**
     * The one minute average of the data message rate received by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageDataRxMsgRate?: number;
    /**
     * The peak of the one minute average of the data message rate transmitted by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageDataTxMsgPeakRate?: number;
    /**
     * The one minute average of the data message rate transmitted by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageDataTxMsgRate?: number;
    /**
     * The peak of the one minute average of the request rate received by the Cache Instance, in requests per second (req/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageRequestRxPeakRate?: number;
    /**
     * The one minute average of the request rate received by the Cache Instance, in requests per second (req/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    averageRequestRxRate?: number;
    /**
     * The data message peak rate received by the Cache Instance, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    dataRxBytePeakRate?: number;
    /**
     * The data message rate received by the Cache Instance, in bytes per second (B/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    dataRxByteRate?: number;
    /**
     * The data message peak rate received by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    dataRxMsgPeakRate?: number;
    /**
     * The data message rate received by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    dataRxMsgRate?: number;
    /**
     * The data message peak rate transmitted by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    dataTxMsgPeakRate?: number;
    /**
     * The data message rate transmitted by the Cache Instance, in messages per second (msg/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    dataTxMsgRate?: number;
    /**
     * The request peak rate received by the Cache Instance, in requests per second (req/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    requestRxPeakRate?: number;
    /**
     * The request rate received by the Cache Instance, in requests per second (req/sec). Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    requestRxRate?: number;
}

export namespace MsgVpnDistributedCacheClusterInstanceRate {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceRate';


}
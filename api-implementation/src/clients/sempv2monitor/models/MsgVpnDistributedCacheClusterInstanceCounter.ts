/* eslint-disable */


/**
 * The counters associated with the Cache Instance. Deprecated since 2.13. All attributes in this object have been moved to the MsgVpnDistributedCacheClusterInstance object.
 */
export type MsgVpnDistributedCacheClusterInstanceCounter = {
    /**
     * The number of messages cached for the Cache Instance. Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    msgCount?: number;
    /**
     * The number of messages cached peak for the Cache Instance. Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    msgPeakCount?: number;
    /**
     * The received request message queue depth for the Cache Instance. Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    requestQueueDepthCount?: number;
    /**
     * The received request message queue depth peak for the Cache Instance. Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    requestQueueDepthPeakCount?: number;
    /**
     * The number of topics cached for the Cache Instance. Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    topicCount?: number;
    /**
     * The number of topics cached peak for the Cache Instance. Deprecated since 2.13. This attribute has been moved to the MsgVpnDistributedCacheClusterInstance object.
     */
    topicPeakCount?: number;
}

export namespace MsgVpnDistributedCacheClusterInstanceCounter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheClusterInstanceCounter';


}
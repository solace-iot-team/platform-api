/* eslint-disable */


import type { EventThresholdByPercent } from './EventThresholdByPercent';
import type { EventThresholdByValue } from './EventThresholdByValue';

export type MsgVpnDistributedCacheCluster = {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    /**
     * Indicates whether deliver-to-one override is enabled for the Cache Cluster.
     */
    deliverToOneOverrideEnabled?: boolean;
    /**
     * Indicates whether the Cache Cluster is enabled.
     */
    enabled?: boolean;
    eventDataByteRateThreshold?: EventThresholdByValue;
    eventDataMsgRateThreshold?: EventThresholdByValue;
    eventMaxMemoryThreshold?: EventThresholdByPercent;
    eventMaxTopicsThreshold?: EventThresholdByPercent;
    eventRequestQueueDepthThreshold?: EventThresholdByPercent;
    eventRequestRateThreshold?: EventThresholdByValue;
    eventResponseRateThreshold?: EventThresholdByValue;
    /**
     * Indicates whether global caching for the Cache Cluster is enabled, and the Cache Instances will fetch topics from remote Home Cache Clusters when requested, and subscribe to those topics to cache them locally.
     */
    globalCachingEnabled?: boolean;
    /**
     * The heartbeat interval, in seconds, used by the Cache Instances to monitor connectivity with the remote Home Cache Clusters.
     */
    globalCachingHeartbeat?: number;
    /**
     * The topic lifetime, in seconds. If no client requests are received for a given global topic over the duration of the topic lifetime, then the Cache Instance will remove the subscription and cached messages for that topic. A value of 0 disables aging.
     */
    globalCachingTopicLifetime?: number;
    /**
     * The maximum memory usage, in megabytes (MB), for each Cache Instance in the Cache Cluster.
     */
    maxMemory?: number;
    /**
     * The maximum number of messages per topic for each Cache Instance in the Cache Cluster. When at the maximum, old messages are removed as new messages arrive.
     */
    maxMsgsPerTopic?: number;
    /**
     * The maximum queue depth for cache requests received by the Cache Cluster.
     */
    maxRequestQueueDepth?: number;
    /**
     * The maximum number of topics for each Cache Instance in the Cache Cluster.
     */
    maxTopicCount?: number;
    /**
     * The message lifetime, in seconds. If a message remains cached for the duration of its lifetime, the Cache Instance will remove the message. A lifetime of 0 results in the message being retained indefinitely.
     */
    msgLifetime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether one or more messages were lost by any Cache Instance in the Cache Cluster.
     */
    msgsLost?: boolean;
    /**
     * Indicates whether advertising of new topics learned by the Cache Instances in this Cache Cluster is enabled.
     */
    newTopicAdvertisementEnabled?: boolean;
}

export namespace MsgVpnDistributedCacheCluster {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheCluster';


}
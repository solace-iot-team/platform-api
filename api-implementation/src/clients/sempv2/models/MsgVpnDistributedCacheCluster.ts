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
     * Enable or disable deliver-to-one override for the Cache Cluster. The default value is `true`.
     */
    deliverToOneOverrideEnabled?: boolean;
    /**
     * Enable or disable the Cache Cluster. The default value is `false`.
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
     * Enable or disable global caching for the Cache Cluster. When enabled, the Cache Instances will fetch topics from remote Home Cache Clusters when requested, and subscribe to those topics to cache them locally. When disabled, the Cache Instances will remove all subscriptions and cached messages for topics from remote Home Cache Clusters. The default value is `false`.
     */
    globalCachingEnabled?: boolean;
    /**
     * The heartbeat interval, in seconds, used by the Cache Instances to monitor connectivity with the remote Home Cache Clusters. The default value is `3`.
     */
    globalCachingHeartbeat?: number;
    /**
     * The topic lifetime, in seconds. If no client requests are received for a given global topic over the duration of the topic lifetime, then the Cache Instance will remove the subscription and cached messages for that topic. A value of 0 disables aging. The default value is `3600`.
     */
    globalCachingTopicLifetime?: number;
    /**
     * The maximum memory usage, in megabytes (MB), for each Cache Instance in the Cache Cluster. The default value is `2048`.
     */
    maxMemory?: number;
    /**
     * The maximum number of messages per topic for each Cache Instance in the Cache Cluster. When at the maximum, old messages are removed as new messages arrive. The default value is `1`.
     */
    maxMsgsPerTopic?: number;
    /**
     * The maximum queue depth for cache requests received by the Cache Cluster. The default value is `100000`.
     */
    maxRequestQueueDepth?: number;
    /**
     * The maximum number of topics for each Cache Instance in the Cache Cluster. The default value is `2000000`.
     */
    maxTopicCount?: number;
    /**
     * The message lifetime, in seconds. If a message remains cached for the duration of its lifetime, the Cache Instance will remove the message. A lifetime of 0 results in the message being retained indefinitely. The default value is `0`.
     */
    msgLifetime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Enable or disable the advertising, onto the message bus, of new topics learned by each Cache Instance in the Cache Cluster. The default value is `false`.
     */
    newTopicAdvertisementEnabled?: boolean;
}

export namespace MsgVpnDistributedCacheCluster {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCacheCluster';


}
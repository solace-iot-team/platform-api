/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnDistributedCacheClusterGlobalCachingHomeClusterTopicPrefix {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The name of the Cache Cluster.
     */
    clusterName?: string;
    /**
     * The name of the remote Home Cache Cluster.
     */
    homeClusterName?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * A topic prefix for global topics available from the remote Home Cache Cluster. A wildcard (/>) is implied at the end of the prefix.
     */
    topicPrefix?: string;
}

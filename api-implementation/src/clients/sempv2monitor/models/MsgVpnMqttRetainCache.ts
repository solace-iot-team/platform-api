/* eslint-disable */


export type MsgVpnMqttRetainCache = {
    /**
     * The name of the backup Cache Instance associated with this MQTT Retain Cache.
     */
    backupCacheInstance?: string;
    /**
     * The reason why the backup cache associated with this MQTT Retain Cache is operationally down, if any.
     */
    backupFailureReason?: string;
    /**
     * Indicates whether the backup cache associated with this MQTT Retain Cache is operationally up.
     */
    backupUp?: boolean;
    /**
     * The number of seconds that the backup cache associated with this MQTT Retain Cache has been operationally up.
     */
    backupUptime?: number;
    /**
     * The name of the Cache Cluster associated with this MQTT Retain Cache.
     */
    cacheCluster?: string;
    /**
     * The name of the MQTT Retain Cache.
     */
    cacheName?: string;
    /**
     * The name of the Distributed Cache associated with this MQTT Retain Cache.
     */
    distributedCache?: string;
    /**
     * Indicates whether this MQTT Retain Cache is enabled. When the cache is disabled, neither retain messages nor retain requests will be delivered by the cache. However, live retain messages will continue to be delivered to currently connected MQTT clients.
     */
    enabled?: boolean;
    /**
     * The reason why this MQTT Retain Cache is operationally down, if any.
     */
    failureReason?: string;
    /**
     * The message lifetime, in seconds. If a message remains cached for the duration of its lifetime, the cache will remove the message. A lifetime of 0 results in the message being retained indefinitely.
     */
    msgLifetime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the primary Cache Instance associated with this MQTT Retain Cache.
     */
    primaryCacheInstance?: string;
    /**
     * The reason why the primary cache associated with this MQTT Retain Cache is operationally down, if any.
     */
    primaryFailureReason?: string;
    /**
     * Indicates whether the primary cache associated with this MQTT Retain Cache is operationally up.
     */
    primaryUp?: boolean;
    /**
     * The number of seconds that the primary cache associated with this MQTT Retain Cache has been operationally up.
     */
    primaryUptime?: number;
    /**
     * Indicates whether this MQTT Retain Cache is operationally up.
     */
    up?: boolean;
    /**
     * The number of seconds that the MQTT Retain Cache has been operationally up.
     */
    uptime?: number;
}

export namespace MsgVpnMqttRetainCache {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttRetainCache';


}
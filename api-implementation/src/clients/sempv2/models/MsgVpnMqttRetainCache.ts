/* eslint-disable */


export type MsgVpnMqttRetainCache = {
    /**
     * The name of the MQTT Retain Cache.
     */
    cacheName?: string;
    /**
     * Enable or disable this MQTT Retain Cache. When the cache is disabled, neither retain messages nor retain requests will be delivered by the cache. However, live retain messages will continue to be delivered to currently connected MQTT clients. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The message lifetime, in seconds. If a message remains cached for the duration of its lifetime, the cache will remove the message. A lifetime of 0 results in the message being retained indefinitely, otherwise it must be 3 seconds or more. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `0`.
     */
    msgLifetime?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnMqttRetainCache {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnMqttRetainCache';


}
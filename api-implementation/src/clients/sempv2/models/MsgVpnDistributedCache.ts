/* eslint-disable */


export type MsgVpnDistributedCache = {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * The virtual router of the Distributed Cache. The default value is `"auto"`. The allowed values and their meaning are:
     *
     * <pre>
     * "auto" - The Distributed Cache is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     * Available since 2.28.
     */
    cacheVirtualRouter?: MsgVpnDistributedCache.cacheVirtualRouter;
    /**
     * Enable or disable the Distributed Cache. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The heartbeat interval, in seconds, used by the Cache Instances to monitor connectivity with the message broker. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `10`.
     */
    heartbeat?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The scheduled delete message day(s), specified as "daily" or a comma-separated list of days. Days must be specified as "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", or "Sat", with no spaces, and in sorted order from Sunday to Saturday. The empty-string ("") can also be specified, indicating no schedule is configured ("scheduledDeleteMsgTimeList" must also be configured to the empty-string). Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    scheduledDeleteMsgDayList?: string;
    /**
     * The scheduled delete message time(s), specified as "hourly" or a comma-separated list of 24-hour times in the form hh:mm, or h:mm. There must be no spaces, and times (up to 4) must be in sorted order from 0:00 to 23:59. The empty-string ("") can also be specified, indicating no schedule is configured ("scheduledDeleteMsgDayList" must also be configured to the empty-string). Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    scheduledDeleteMsgTimeList?: string;
}

export namespace MsgVpnDistributedCache {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnDistributedCache';

    /**
     * The virtual router of the Distributed Cache. The default value is `"auto"`. The allowed values and their meaning are:
     *
     * <pre>
     * "auto" - The Distributed Cache is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     * Available since 2.28.
     */
    export enum cacheVirtualRouter {
        AUTO = 'auto',
    }


}
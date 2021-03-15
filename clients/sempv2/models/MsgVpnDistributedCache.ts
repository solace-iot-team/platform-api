/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnDistributedCache = {
    /**
     * The name of the Distributed Cache.
     */
    cacheName?: string;
    /**
     * Enable or disable the Distributed Cache. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The heartbeat interval, in seconds, used by the Cache Instances to monitor connectivity with the message broker. The default value is `10`.
     */
    heartbeat?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The scheduled delete message day(s), specified as "daily" or a comma-separated list of days. Days must be specified as "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", or "Sat", with no spaces, and in sorted order from Sunday to Saturday. The default value is `""`.
     */
    scheduledDeleteMsgDayList?: string;
    /**
     * The scheduled delete message time(s), specified as "hourly" or a comma-separated list of 24-hour times in the form hh:mm, or h:mm. There must be no spaces, and times must be in sorted order from 0:00 to 23:59. The default value is `""`.
     */
    scheduledDeleteMsgTimeList?: string;
}

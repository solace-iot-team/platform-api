/* eslint-disable */


export type MsgVpnReplayLog = {
    /**
     * Enable or disable the transmission of messages from the Replay Log. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    egressEnabled?: boolean;
    /**
     * Enable or disable the reception of messages to the Replay Log. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    ingressEnabled?: boolean;
    /**
     * The maximum spool usage allowed by the Replay Log, in megabytes (MB). If this limit is exceeded, old messages will be trimmed. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `0`.
     */
    maxSpoolUsage?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the Replay Log.
     */
    replayLogName?: string;
    /**
     * Enable or disable topic filtering for the Replay Log. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`. Available since 2.27.
     */
    topicFilterEnabled?: boolean;
}

export namespace MsgVpnReplayLog {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLog';


}
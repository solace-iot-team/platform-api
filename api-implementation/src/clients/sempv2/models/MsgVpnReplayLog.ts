/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnReplayLog = {
    /**
     * Enable or disable the transmission of messages from the Replay Log. The default value is `false`.
     */
    egressEnabled?: boolean;
    /**
     * Enable or disable the reception of messages to the Replay Log. The default value is `false`.
     */
    ingressEnabled?: boolean;
    /**
     * The maximum spool usage allowed by the Replay Log, in megabytes (MB). If this limit is exceeded, old messages will be trimmed. The default value is `0`.
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
}

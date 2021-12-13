/* eslint-disable */


export type MsgVpnReplayLog = {
    /**
     * Indicates whether the transmission of messages from the Replay Log is enabled.
     */
    egressEnabled?: boolean;
    /**
     * Indicates whether the reception of messages to the Replay Log is enabled.
     */
    ingressEnabled?: boolean;
    /**
     * The maximum spool usage allowed by the Replay Log, in megabytes (MB). If this limit is exceeded, old messages will be trimmed.
     */
    maxSpoolUsage?: number;
    /**
     * The spool usage of the Replay Log, in bytes (B).
     */
    msgSpoolUsage?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the Replay Log.
     */
    replayLogName?: string;
}

export namespace MsgVpnReplayLog {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnReplayLog';


}
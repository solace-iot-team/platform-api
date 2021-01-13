/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnReplicatedTopic {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The topic for applying replication. Published messages matching this topic will be replicated to the standby site.
     */
    replicatedTopic?: string;
    /**
     * The replication mode for the Replicated Topic. The default value is `"async"`. The allowed values and their meaning are:
     *
     * <pre>
     * "sync" - Messages are acknowledged when replicated (spooled remotely).
     * "async" - Messages are acknowledged when pending replication (spooled locally).
     * </pre>
     *
     */
    replicationMode?: MsgVpnReplicatedTopic.replicationMode;
}

export namespace MsgVpnReplicatedTopic {

    /**
     * The replication mode for the Replicated Topic. The default value is `"async"`. The allowed values and their meaning are:
     *
     * <pre>
     * "sync" - Messages are acknowledged when replicated (spooled remotely).
     * "async" - Messages are acknowledged when pending replication (spooled locally).
     * </pre>
     *
     */
    export enum replicationMode {
        SYNC = 'sync',
        ASYNC = 'async',
    }


}

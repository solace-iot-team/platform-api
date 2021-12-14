/* eslint-disable */


export type ConfigSyncLocalDatabaseRow = {
    /**
     * The last series of commands exchanged between Config Sync sites. Note that this value is only updated during transitions to any syncStatus that is not "in-sync".
     */
    lastRequest?: string;
    /**
     * The result of the last exchange between Config Sync sites.
     */
    lastResult?: string;
    /**
     * The name is "site" when the row type is "router", otherwise it is the Message VPN name.
     */
    name?: string;
    /**
     * The row's role relative to the local broker. The allowed values and their meaning are:
     *
     * <pre>
     * "unknown" - The role is unknown.
     * "leader" - In HA deployments, the role of the event broker and Message VPNs in the Config Sync database of both HA mates is always Leader.
     * "follower" - Only replication-enabled Message VPNs on standby replication mates can have a Follower role.
     * </pre>
     *
     */
    role?: string;
    /**
     * The synchronization status of the row. The allowed values and their meaning are:
     *
     * <pre>
     * "unknown" - The state is unknown.
     * "in-sync" - The config data is synchronized between Message VPNs.
     * "reconciling" - The config data is reconciling between Message VPNs.
     * "blocked" - The config data is blocked from reconciling due to an error.
     * "out-of-sync" - The config data is out of sync between Message VPNs.
     * "down" - The state is down due to configuration.
     * </pre>
     *
     */
    syncStatus?: string;
    /**
     * The amount of time this row has remained in the shown syncStatus, in seconds.
     */
    timeInState?: number;
    /**
     * The type of the row. Can be one of "router" or "vpn". There is one "router" row and one row for each configured "vpn". Each row represents a table of information that is synchronized between Config Sync and replication mates. The allowed values and their meaning are:
     *
     * <pre>
     * "router" - The Config Sync database row is for the Router.
     * "vpn" - The Config Sync database row is for a Message VPN.
     * </pre>
     *
     */
    type?: ConfigSyncLocalDatabaseRow.type;
}

export namespace ConfigSyncLocalDatabaseRow {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigSyncLocalDatabaseRow';

    /**
     * The type of the row. Can be one of "router" or "vpn". There is one "router" row and one row for each configured "vpn". Each row represents a table of information that is synchronized between Config Sync and replication mates. The allowed values and their meaning are:
     *
     * <pre>
     * "router" - The Config Sync database row is for the Router.
     * "vpn" - The Config Sync database row is for a Message VPN.
     * </pre>
     *
     */
    export enum type {
        ROUTER = 'router',
        VPN = 'vpn',
    }


}
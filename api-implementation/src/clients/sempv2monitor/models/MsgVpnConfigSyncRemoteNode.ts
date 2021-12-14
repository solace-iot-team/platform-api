/* eslint-disable */


export type MsgVpnConfigSyncRemoteNode = {
    /**
     * The amount of time in seconds since the last message was received from the config sync table of the remote Message VPN. Deprecated since 2.22. This attribute has been deprecated.
     */
    lastMsgRxTime?: number;
    /**
     * The name of the Message VPN. Deprecated since 2.22. This attribute has been deprecated.
     */
    msgVpnName?: string;
    /**
     * The name of the Config Sync Remote Node. Deprecated since 2.22. This attribute has been deprecated.
     */
    remoteNodeName?: string;
    /**
     * The role of the config sync table of the remote Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "unknown" - The role is unknown.
     * "primary" - Acts as the primary source of config data.
     * "replica" - Acts as a replica of the primary config data.
     * </pre>
     * Deprecated since 2.22. This attribute has been deprecated.
     */
    role?: string;
    /**
     * Indicates whether the config sync table of the remote Message VPN is stale. Deprecated since 2.22. This attribute has been deprecated.
     */
    stale?: boolean;
    /**
     * The state of the config sync table of the remote Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "unknown" - The state is unknown.
     * "in-sync" - The config data is synchronized between Message VPNs.
     * "reconciling" - The config data is reconciling between Message VPNs.
     * "blocked" - The config data is blocked from reconciling due to an error.
     * "out-of-sync" - The config data is out of sync between Message VPNs.
     * "down" - The state is down due to configuration.
     * </pre>
     * Deprecated since 2.22. This attribute has been deprecated.
     */
    state?: string;
    /**
     * The amount of time in seconds the config sync table of the remote Message VPN has been in the current state. Deprecated since 2.22. This attribute has been deprecated.
     */
    timeInState?: number;
}

export namespace MsgVpnConfigSyncRemoteNode {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnConfigSyncRemoteNode';


}
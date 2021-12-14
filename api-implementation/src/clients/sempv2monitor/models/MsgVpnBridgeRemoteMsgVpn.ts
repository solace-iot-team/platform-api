/* eslint-disable */


export type MsgVpnBridgeRemoteMsgVpn = {
    /**
     * Indicates whether the Bridge is bound to the queue in the remote Message VPN.
     */
    boundToQueue?: boolean;
    /**
     * The name of the Bridge.
     */
    bridgeName?: string;
    /**
     * The virtual router of the Bridge. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The Bridge is used for the primary virtual router.
     * "backup" - The Bridge is used for the backup virtual router.
     * "auto" - The Bridge is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     *
     */
    bridgeVirtualRouter?: MsgVpnBridgeRemoteMsgVpn.bridgeVirtualRouter;
    /**
     * The Client Username the Bridge uses to login to the remote Message VPN. This per remote Message VPN value overrides the value provided for the Bridge overall.
     */
    clientUsername?: string;
    /**
     * Indicates whether data compression is enabled for the remote Message VPN connection.
     */
    compressedDataEnabled?: boolean;
    /**
     * The preference given to incoming connections from remote Message VPN hosts, from 1 (highest priority) to 4 (lowest priority).
     */
    connectOrder?: number;
    /**
     * The number of outstanding guaranteed messages that can be transmitted over the remote Message VPN connection before an acknowledgement is received.
     */
    egressFlowWindowSize?: number;
    /**
     * Indicates whether the remote Message VPN is enabled.
     */
    enabled?: boolean;
    /**
     * The reason for the last connection failure to the remote Message VPN.
     */
    lastConnectionFailureReason?: string;
    /**
     * The reason for the last queue bind failure in the remote Message VPN.
     */
    lastQueueBindFailureReason?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The queue binding of the Bridge in the remote Message VPN.
     */
    queueBinding?: string;
    /**
     * The amount of time in seconds since the queue was bound in the remote Message VPN.
     */
    queueBoundUptime?: number;
    /**
     * The physical interface on the local Message VPN host for connecting to the remote Message VPN. By default, an interface is chosen automatically (recommended), but if specified, `remoteMsgVpnLocation` must not be a virtual router name.
     */
    remoteMsgVpnInterface?: string;
    /**
     * The location of the remote Message VPN as either an FQDN with port, IP address with port, or virtual router name (starting with "v:").
     */
    remoteMsgVpnLocation?: string;
    /**
     * The name of the remote Message VPN.
     */
    remoteMsgVpnName?: string;
    /**
     * Indicates whether encryption (TLS) is enabled for the remote Message VPN connection.
     */
    tlsEnabled?: boolean;
    /**
     * The Client Profile for the unidirectional Bridge of the remote Message VPN. The Client Profile must exist in the local Message VPN, and it is used only for the TCP parameters. Note that the default client profile has a TCP maximum window size of 2MB.
     */
    unidirectionalClientProfile?: string;
    /**
     * Indicates whether the connection to the remote Message VPN is up.
     */
    up?: boolean;
}

export namespace MsgVpnBridgeRemoteMsgVpn {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRemoteMsgVpn';

    /**
     * The virtual router of the Bridge. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The Bridge is used for the primary virtual router.
     * "backup" - The Bridge is used for the backup virtual router.
     * "auto" - The Bridge is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     *
     */
    export enum bridgeVirtualRouter {
        PRIMARY = 'primary',
        BACKUP = 'backup',
        AUTO = 'auto',
    }


}
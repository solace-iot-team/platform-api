/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnBridgeRemoteMsgVpn {
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
     * The Client Username the Bridge uses to login to the remote Message VPN. This per remote Message VPN value overrides the value provided for the Bridge overall. The default value is `""`.
     */
    clientUsername?: string;
    /**
     * Enable or disable data compression for the remote Message VPN connection. The default value is `false`.
     */
    compressedDataEnabled?: boolean;
    /**
     * The preference given to incoming connections from remote Message VPN hosts, from 1 (highest priority) to 4 (lowest priority). The default value is `4`.
     */
    connectOrder?: number;
    /**
     * The number of outstanding guaranteed messages that can be transmitted over the remote Message VPN connection before an acknowledgement is received. The default value is `255`.
     */
    egressFlowWindowSize?: number;
    /**
     * Enable or disable the remote Message VPN. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The password for the Client Username. This attribute is absent from a GET and not updated when absent in a PUT. The default is to have no `password`.
     */
    password?: string;
    /**
     * The queue binding of the Bridge in the remote Message VPN. The default value is `""`.
     */
    queueBinding?: string;
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
     * Enable or disable encryption (TLS) for the remote Message VPN connection. The default value is `false`.
     */
    tlsEnabled?: boolean;
    /**
     * The Client Profile for the unidirectional Bridge of the remote Message VPN. The Client Profile must exist in the local Message VPN, and it is used only for the TCP parameters. Note that the default client profile has a TCP maximum window size of 2MB. The default value is `"#client-profile"`.
     */
    unidirectionalClientProfile?: string;
}

export namespace MsgVpnBridgeRemoteMsgVpn {

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

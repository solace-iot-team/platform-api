/* eslint-disable */


import type { MsgVpnBridgeCounter } from './MsgVpnBridgeCounter';
import type { MsgVpnBridgeRate } from './MsgVpnBridgeRate';

export type MsgVpnBridge = {
    /**
     * The one minute average of the message rate received from the Bridge, in bytes per second (B/sec). Available since 2.13.
     */
    averageRxByteRate?: number;
    /**
     * The one minute average of the message rate received from the Bridge, in messages per second (msg/sec). Available since 2.13.
     */
    averageRxMsgRate?: number;
    /**
     * The one minute average of the message rate transmitted to the Bridge, in bytes per second (B/sec). Available since 2.13.
     */
    averageTxByteRate?: number;
    /**
     * The one minute average of the message rate transmitted to the Bridge, in messages per second (msg/sec). Available since 2.13.
     */
    averageTxMsgRate?: number;
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
    bridgeVirtualRouter?: MsgVpnBridge.bridgeVirtualRouter;
    /**
     * The name of the Client for the Bridge.
     */
    clientName?: string;
    /**
     * Indicates whether messages transmitted over the Bridge are compressed.
     */
    compressed?: boolean;
    /**
     * The amount of client control messages received from the Bridge, in bytes (B). Available since 2.13.
     */
    controlRxByteCount?: number;
    /**
     * The number of client control messages received from the Bridge. Available since 2.13.
     */
    controlRxMsgCount?: number;
    /**
     * The amount of client control messages transmitted to the Bridge, in bytes (B). Available since 2.13.
     */
    controlTxByteCount?: number;
    /**
     * The number of client control messages transmitted to the Bridge. Available since 2.13.
     */
    controlTxMsgCount?: number;
    counter?: MsgVpnBridgeCounter;
    /**
     * The amount of client data messages received from the Bridge, in bytes (B). Available since 2.13.
     */
    dataRxByteCount?: number;
    /**
     * The number of client data messages received from the Bridge. Available since 2.13.
     */
    dataRxMsgCount?: number;
    /**
     * The amount of client data messages transmitted to the Bridge, in bytes (B). Available since 2.13.
     */
    dataTxByteCount?: number;
    /**
     * The number of client data messages transmitted to the Bridge. Available since 2.13.
     */
    dataTxMsgCount?: number;
    /**
     * The number of messages discarded during reception from the Bridge. Available since 2.13.
     */
    discardedRxMsgCount?: number;
    /**
     * The number of messages discarded during transmission to the Bridge. Available since 2.13.
     */
    discardedTxMsgCount?: number;
    /**
     * Indicates whether the Bridge is enabled.
     */
    enabled?: boolean;
    /**
     * Indicates whether messages transmitted over the Bridge are encrypted with TLS.
     */
    encrypted?: boolean;
    /**
     * The establisher of the Bridge connection. The allowed values and their meaning are:
     *
     * <pre>
     * "local" - The Bridge connection was established by the local Message VPN.
     * "remote" - The Bridge connection was established by the remote Message VPN.
     * </pre>
     *
     */
    establisher?: string;
    /**
     * The reason for the inbound connection failure from the Bridge. If there is no failure reason, an empty string ("") is returned.
     */
    inboundFailureReason?: string;
    /**
     * The state of the inbound connection from the Bridge. The allowed values and their meaning are:
     *
     * <pre>
     * "init" - The connection is initializing.
     * "disabled" - The connection is disabled by configuration.
     * "enabled" - The connection is enabled by configuration.
     * "prepare" - The connection is operationally down.
     * "prepare-wait-to-connect" - The connection is waiting to connect.
     * "prepare-fetching-dns" - The domain name of the destination node is being resolved.
     * "not-ready" - The connection is operationally down.
     * "not-ready-connecting" - The connection is trying to connect.
     * "not-ready-handshaking" - The connection is handshaking.
     * "not-ready-wait-next" - The connection failed to connect and is waiting to retry.
     * "not-ready-wait-reuse" - The connection is closing in order to reuse an existing connection.
     * "not-ready-wait-bridge-version-mismatch" - The connection is closing because of a version mismatch.
     * "not-ready-wait-cleanup" - The connection is closed and cleaning up.
     * "ready" - The connection is operationally up.
     * "ready-subscribing" - The connection is up and synchronizing subscriptions.
     * "ready-in-sync" - The connection is up and subscriptions are synchronized.
     * </pre>
     *
     */
    inboundState?: string;
    /**
     * The ID of the last message transmitted to the Bridge.
     */
    lastTxMsgId?: number;
    /**
     * The physical interface on the local Message VPN host for connecting to the remote Message VPN.
     */
    localInterface?: string;
    /**
     * The name of the local queue for the Bridge.
     */
    localQueueName?: string;
    /**
     * The number of login request messages received from the Bridge. Available since 2.13.
     */
    loginRxMsgCount?: number;
    /**
     * The number of login response messages transmitted to the Bridge. Available since 2.13.
     */
    loginTxMsgCount?: number;
    /**
     * The maximum time-to-live (TTL) in hops. Messages are discarded if their TTL exceeds this value.
     */
    maxTtl?: number;
    /**
     * The number of guaranteed messages received from the Bridge. Available since 2.13.
     */
    msgSpoolRxMsgCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The state of the outbound connection to the Bridge. The allowed values and their meaning are:
     *
     * <pre>
     * "init" - The connection is initializing.
     * "disabled" - The connection is disabled by configuration.
     * "enabled" - The connection is enabled by configuration.
     * "prepare" - The connection is operationally down.
     * "prepare-wait-to-connect" - The connection is waiting to connect.
     * "prepare-fetching-dns" - The domain name of the destination node is being resolved.
     * "not-ready" - The connection is operationally down.
     * "not-ready-connecting" - The connection is trying to connect.
     * "not-ready-handshaking" - The connection is handshaking.
     * "not-ready-wait-next" - The connection failed to connect and is waiting to retry.
     * "not-ready-wait-reuse" - The connection is closing in order to reuse an existing connection.
     * "not-ready-wait-bridge-version-mismatch" - The connection is closing because of a version mismatch.
     * "not-ready-wait-cleanup" - The connection is closed and cleaning up.
     * "ready" - The connection is operationally up.
     * "ready-subscribing" - The connection is up and synchronizing subscriptions.
     * "ready-in-sync" - The connection is up and subscriptions are synchronized.
     * </pre>
     *
     */
    outboundState?: string;
    rate?: MsgVpnBridgeRate;
    /**
     * The FQDN or IP address of the remote Message VPN.
     */
    remoteAddress?: string;
    /**
     * The Client Username the Bridge uses to login to the remote Message VPN.
     */
    remoteAuthenticationBasicClientUsername?: string;
    /**
     * The authentication scheme for the remote Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    remoteAuthenticationScheme?: MsgVpnBridge.remoteAuthenticationScheme;
    /**
     * The maximum number of retry attempts to establish a connection to the remote Message VPN. A value of 0 means to retry forever.
     */
    remoteConnectionRetryCount?: number;
    /**
     * The number of seconds the broker waits for the bridge connection to be established before attempting a new connection.
     */
    remoteConnectionRetryDelay?: number;
    /**
     * The priority for deliver-to-one (DTO) messages transmitted from the remote Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "p1" - The 1st or highest priority.
     * "p2" - The 2nd highest priority.
     * "p3" - The 3rd highest priority.
     * "p4" - The 4th highest priority.
     * "da" - Ignore priority and deliver always.
     * </pre>
     *
     */
    remoteDeliverToOnePriority?: MsgVpnBridge.remoteDeliverToOnePriority;
    /**
     * The name of the remote Message VPN.
     */
    remoteMsgVpnName?: string;
    /**
     * The name of the remote router.
     */
    remoteRouterName?: string;
    /**
     * The ID of the transmit flow for the connected remote Message VPN.
     */
    remoteTxFlowId?: number;
    /**
     * The amount of messages received from the Bridge, in bytes (B). Available since 2.13.
     */
    rxByteCount?: number;
    /**
     * The current message rate received from the Bridge, in bytes per second (B/sec). Available since 2.13.
     */
    rxByteRate?: number;
    /**
     * The category of the inbound connection failure from the Bridge. The allowed values and their meaning are:
     *
     * <pre>
     * "no-failure" - There is no bridge failure.
     * "local-configuration-problem" - The bridge failure is a local configuration problem.
     * "local-operational-state-problem" - The bridge failure is an operational state problem.
     * </pre>
     * Available since 2.18.
     */
    rxConnectionFailureCategory?: string;
    /**
     * The number of messages received from the Bridge. Available since 2.13.
     */
    rxMsgCount?: number;
    /**
     * The current message rate received from the Bridge, in messages per second (msg/sec). Available since 2.13.
     */
    rxMsgRate?: number;
    /**
     * The colon-separated list of cipher suites supported for TLS connections to the remote Message VPN. The value "default" implies all supported suites ordered from most secure to least secure.
     */
    tlsCipherSuiteList?: string;
    /**
     * Indicates whether the Bridge is configured to use the default cipher-suite list.
     */
    tlsDefaultCipherSuiteList?: boolean;
    /**
     * Indicates whether the TTL (hops) exceeded event has been raised.
     */
    ttlExceededEventRaised?: boolean;
    /**
     * The amount of messages transmitted to the Bridge, in bytes (B). Available since 2.13.
     */
    txByteCount?: number;
    /**
     * The current message rate transmitted to the Bridge, in bytes per second (B/sec). Available since 2.13.
     */
    txByteRate?: number;
    /**
     * The number of messages transmitted to the Bridge. Available since 2.13.
     */
    txMsgCount?: number;
    /**
     * The current message rate transmitted to the Bridge, in messages per second (msg/sec). Available since 2.13.
     */
    txMsgRate?: number;
    /**
     * The amount of time in seconds since the Bridge connected to the remote Message VPN.
     */
    uptime?: number;
}

export namespace MsgVpnBridge {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridge';

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

    /**
     * The authentication scheme for the remote Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    export enum remoteAuthenticationScheme {
        BASIC = 'basic',
        CLIENT_CERTIFICATE = 'client-certificate',
    }

    /**
     * The priority for deliver-to-one (DTO) messages transmitted from the remote Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "p1" - The 1st or highest priority.
     * "p2" - The 2nd highest priority.
     * "p3" - The 3rd highest priority.
     * "p4" - The 4th highest priority.
     * "da" - Ignore priority and deliver always.
     * </pre>
     *
     */
    export enum remoteDeliverToOnePriority {
        P1 = 'p1',
        P2 = 'p2',
        P3 = 'p3',
        P4 = 'p4',
        DA = 'da',
    }


}
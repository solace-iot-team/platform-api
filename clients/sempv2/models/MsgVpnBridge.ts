/* eslint-disable */


export type MsgVpnBridge = {
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
     * Enable or disable the Bridge. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The maximum time-to-live (TTL) in hops. Messages are discarded if their TTL exceeds this value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `8`.
     */
    maxTtl?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The Client Username the Bridge uses to login to the remote Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    remoteAuthenticationBasicClientUsername?: string;
    /**
     * The password for the Client Username. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    remoteAuthenticationBasicPassword?: string;
    /**
     * The PEM formatted content for the client certificate used by the Bridge to login to the remote Message VPN. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    remoteAuthenticationClientCertContent?: string;
    /**
     * The password for the client certificate. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`. Available since 2.9.
     */
    remoteAuthenticationClientCertPassword?: string;
    /**
     * The authentication scheme for the remote Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"basic"`. The allowed values and their meaning are:
     *
     * <pre>
     * "basic" - Basic Authentication Scheme (via username and password).
     * "client-certificate" - Client Certificate Authentication Scheme (via certificate file or content).
     * </pre>
     *
     */
    remoteAuthenticationScheme?: MsgVpnBridge.remoteAuthenticationScheme;
    /**
     * The maximum number of retry attempts to establish a connection to the remote Message VPN. A value of 0 means to retry forever. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `0`.
     */
    remoteConnectionRetryCount?: number;
    /**
     * The number of seconds the broker waits for the bridge connection to be established before attempting a new connection. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `3`.
     */
    remoteConnectionRetryDelay?: number;
    /**
     * The priority for deliver-to-one (DTO) messages transmitted from the remote Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"p1"`. The allowed values and their meaning are:
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
     * The colon-separated list of cipher suites supported for TLS connections to the remote Message VPN. The value "default" implies all supported suites ordered from most secure to least secure. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"default"`.
     */
    tlsCipherSuiteList?: string;
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
     * The authentication scheme for the remote Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"basic"`. The allowed values and their meaning are:
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
     * The priority for deliver-to-one (DTO) messages transmitted from the remote Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"p1"`. The allowed values and their meaning are:
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
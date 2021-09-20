/* eslint-disable */


export type MsgVpnBridgeTlsTrustedCommonName = {
    /**
     * The name of the Bridge. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
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
     * Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    bridgeVirtualRouter?: MsgVpnBridgeTlsTrustedCommonName.bridgeVirtualRouter;
    /**
     * The name of the Message VPN. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    msgVpnName?: string;
    /**
     * The expected trusted common name of the remote certificate. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsTrustedCommonName?: string;
}

export namespace MsgVpnBridgeTlsTrustedCommonName {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeTlsTrustedCommonName';

    /**
     * The virtual router of the Bridge. The allowed values and their meaning are:
     *
     * <pre>
     * "primary" - The Bridge is used for the primary virtual router.
     * "backup" - The Bridge is used for the backup virtual router.
     * "auto" - The Bridge is automatically assigned a virtual router at creation, depending on the broker's active-standby role.
     * </pre>
     * Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    export enum bridgeVirtualRouter {
        PRIMARY = 'primary',
        BACKUP = 'backup',
        AUTO = 'auto',
    }


}
/* eslint-disable */


export type MsgVpnBridgeRemoteSubscription = {
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
    bridgeVirtualRouter?: MsgVpnBridgeRemoteSubscription.bridgeVirtualRouter;
    /**
     * Enable or disable deliver-always for the Bridge remote subscription topic instead of a deliver-to-one remote priority. A given topic for the Bridge may be deliver-to-one or deliver-always but not both.
     */
    deliverAlwaysEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The topic of the Bridge remote subscription.
     */
    remoteSubscriptionTopic?: string;
}

export namespace MsgVpnBridgeRemoteSubscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeRemoteSubscription';

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
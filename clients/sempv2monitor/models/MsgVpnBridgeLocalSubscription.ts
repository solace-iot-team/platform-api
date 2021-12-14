/* eslint-disable */


export type MsgVpnBridgeLocalSubscription = {
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
    bridgeVirtualRouter?: MsgVpnBridgeLocalSubscription.bridgeVirtualRouter;
    /**
     * The priority of the Bridge local subscription topic for receiving deliver-to-one (DTO) messages. The allowed values and their meaning are:
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
    dtoPriority?: string;
    /**
     * The topic of the Bridge local subscription.
     */
    localSubscriptionTopic?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnBridgeLocalSubscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnBridgeLocalSubscription';

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
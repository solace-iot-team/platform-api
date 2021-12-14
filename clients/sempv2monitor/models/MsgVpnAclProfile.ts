/* eslint-disable */


export type MsgVpnAclProfile = {
    /**
     * The name of the ACL Profile.
     */
    aclProfileName?: string;
    /**
     * The default action to take when a client using the ACL Profile connects to the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow client connection unless an exception is found for it.
     * "disallow" - Disallow client connection unless an exception is found for it.
     * </pre>
     *
     */
    clientConnectDefaultAction?: MsgVpnAclProfile.clientConnectDefaultAction;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The default action to take when a client using the ACL Profile publishes to a topic in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow topic unless an exception is found for it.
     * "disallow" - Disallow topic unless an exception is found for it.
     * </pre>
     *
     */
    publishTopicDefaultAction?: MsgVpnAclProfile.publishTopicDefaultAction;
    /**
     * The default action to take when a client using the ACL Profile subscribes to a share-name subscription in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow topic unless an exception is found for it.
     * "disallow" - Disallow topic unless an exception is found for it.
     * </pre>
     * Available since 2.14.
     */
    subscribeShareNameDefaultAction?: MsgVpnAclProfile.subscribeShareNameDefaultAction;
    /**
     * The default action to take when a client using the ACL Profile subscribes to a topic in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow topic unless an exception is found for it.
     * "disallow" - Disallow topic unless an exception is found for it.
     * </pre>
     *
     */
    subscribeTopicDefaultAction?: MsgVpnAclProfile.subscribeTopicDefaultAction;
}

export namespace MsgVpnAclProfile {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfile';

    /**
     * The default action to take when a client using the ACL Profile connects to the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow client connection unless an exception is found for it.
     * "disallow" - Disallow client connection unless an exception is found for it.
     * </pre>
     *
     */
    export enum clientConnectDefaultAction {
        ALLOW = 'allow',
        DISALLOW = 'disallow',
    }

    /**
     * The default action to take when a client using the ACL Profile publishes to a topic in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow topic unless an exception is found for it.
     * "disallow" - Disallow topic unless an exception is found for it.
     * </pre>
     *
     */
    export enum publishTopicDefaultAction {
        ALLOW = 'allow',
        DISALLOW = 'disallow',
    }

    /**
     * The default action to take when a client using the ACL Profile subscribes to a share-name subscription in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow topic unless an exception is found for it.
     * "disallow" - Disallow topic unless an exception is found for it.
     * </pre>
     * Available since 2.14.
     */
    export enum subscribeShareNameDefaultAction {
        ALLOW = 'allow',
        DISALLOW = 'disallow',
    }

    /**
     * The default action to take when a client using the ACL Profile subscribes to a topic in the Message VPN. The allowed values and their meaning are:
     *
     * <pre>
     * "allow" - Allow topic unless an exception is found for it.
     * "disallow" - Disallow topic unless an exception is found for it.
     * </pre>
     *
     */
    export enum subscribeTopicDefaultAction {
        ALLOW = 'allow',
        DISALLOW = 'disallow',
    }


}
/* eslint-disable */


export type OauthProfileAccessLevelGroupMsgVpnAccessLevelException = {
    /**
     * The message VPN access level. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to a Message VPN.
     * "read-only" - User has read-only access to a Message VPN.
     * "read-write" - User has read-write access to most Message VPN settings.
     * </pre>
     *
     */
    accessLevel?: OauthProfileAccessLevelGroupMsgVpnAccessLevelException.accessLevel;
    /**
     * The name of the group.
     */
    groupName?: string;
    /**
     * The name of the message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace OauthProfileAccessLevelGroupMsgVpnAccessLevelException {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileAccessLevelGroupMsgVpnAccessLevelException';

    /**
     * The message VPN access level. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to a Message VPN.
     * "read-only" - User has read-only access to a Message VPN.
     * "read-write" - User has read-write access to most Message VPN settings.
     * </pre>
     *
     */
    export enum accessLevel {
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
    }


}
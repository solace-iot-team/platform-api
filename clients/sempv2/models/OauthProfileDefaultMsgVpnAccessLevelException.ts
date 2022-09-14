/* eslint-disable */


export type OauthProfileDefaultMsgVpnAccessLevelException = {
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
    accessLevel?: OauthProfileDefaultMsgVpnAccessLevelException.accessLevel;
    /**
     * The name of the message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace OauthProfileDefaultMsgVpnAccessLevelException {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileDefaultMsgVpnAccessLevelException';

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
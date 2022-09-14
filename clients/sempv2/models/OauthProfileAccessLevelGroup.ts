/* eslint-disable */


export type OauthProfileAccessLevelGroup = {
    /**
     * A description for the group. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    description?: string;
    /**
     * The global access level for this group. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to global data.
     * "read-only" - User has read-only access to global data.
     * "read-write" - User has read-write access to most global data.
     * "admin" - User has read-write access to all global data.
     * </pre>
     *
     */
    globalAccessLevel?: OauthProfileAccessLevelGroup.globalAccessLevel;
    /**
     * The name of the group.
     */
    groupName?: string;
    /**
     * The default message VPN access level for this group. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to a Message VPN.
     * "read-only" - User has read-only access to a Message VPN.
     * "read-write" - User has read-write access to most Message VPN settings.
     * </pre>
     *
     */
    msgVpnAccessLevel?: OauthProfileAccessLevelGroup.msgVpnAccessLevel;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
}

export namespace OauthProfileAccessLevelGroup {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OauthProfileAccessLevelGroup';

    /**
     * The global access level for this group. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to global data.
     * "read-only" - User has read-only access to global data.
     * "read-write" - User has read-write access to most global data.
     * "admin" - User has read-write access to all global data.
     * </pre>
     *
     */
    export enum globalAccessLevel {
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
        ADMIN = 'admin',
    }

    /**
     * The default message VPN access level for this group. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - User has no access to a Message VPN.
     * "read-only" - User has read-only access to a Message VPN.
     * "read-write" - User has read-write access to most Message VPN settings.
     * </pre>
     *
     */
    export enum msgVpnAccessLevel {
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
    }


}
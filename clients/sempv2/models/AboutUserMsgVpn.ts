/* eslint-disable */


export type AboutUserMsgVpn = {
    /**
     * The Message VPN access level of the User. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - No access.
     * "read-only" - Read only access.
     * "read-write" - Read and write access.
     * </pre>
     *
     */
    accessLevel?: AboutUserMsgVpn.accessLevel;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace AboutUserMsgVpn {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutUserMsgVpn';

    /**
     * The Message VPN access level of the User. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - No access.
     * "read-only" - Read only access.
     * "read-write" - Read and write access.
     * </pre>
     *
     */
    export enum accessLevel {
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
    }


}
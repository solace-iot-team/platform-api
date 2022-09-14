/* eslint-disable */


export type AboutUser = {
    /**
     * The global access level of the User. The allowed values and their meaning are:
     *
     * <pre>
     * "admin" - Full administrative access.
     * "none" - No access.
     * "read-only" - Read only access.
     * "read-write" - Read and write access.
     * </pre>
     *
     */
    globalAccessLevel?: AboutUser.globalAccessLevel;
    /**
     * Indicates whether a session is active for this request. Available since 2.24.
     */
    sessionActive?: boolean;
    /**
     * The timestamp of when the session was created. This attribute may not be returned in a GET. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.21.
     */
    sessionCreateTime?: number;
    /**
     * The current server timestamp. This is provided as a reference point for the other timestamps provided. This attribute may not be returned in a GET. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.21.
     */
    sessionCurrentTime?: number;
    /**
     * The hard expiry time for the session. After this time the session will be invalid, regardless of activity. This attribute may not be returned in a GET. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.21.
     */
    sessionHardExpiryTime?: number;
    /**
     * An identifier for the session to differentiate this session from other sessions for the same user. This value is not guaranteed to be unique between active sessions for different users. This attribute may not be returned in a GET. Available since 2.21.
     */
    sessionId?: string;
    /**
     * The session idle expiry time. After this time the session will be invalid if there has been no activity. This attribute may not be returned in a GET. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Available since 2.21.
     */
    sessionIdleExpiryTime?: number;
    /**
     * The username of the User. Available since 2.21.
     */
    username?: string;
}

export namespace AboutUser {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutUser';

    /**
     * The global access level of the User. The allowed values and their meaning are:
     *
     * <pre>
     * "admin" - Full administrative access.
     * "none" - No access.
     * "read-only" - Read only access.
     * "read-write" - Read and write access.
     * </pre>
     *
     */
    export enum globalAccessLevel {
        ADMIN = 'admin',
        NONE = 'none',
        READ_ONLY = 'read-only',
        READ_WRITE = 'read-write',
    }


}
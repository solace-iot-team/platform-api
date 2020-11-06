/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface AboutUser {
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
}

export namespace AboutUser {

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

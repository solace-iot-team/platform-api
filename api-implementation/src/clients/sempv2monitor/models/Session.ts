/* eslint-disable */


export type Session = {
    /**
     * The timestamp of when the session was created. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    createTime?: number;
    /**
     * The timestamp of when the last activity on the session occurred. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    lastActivityTime?: number;
    /**
     * The unique identifier for the session.
     */
    sessionId?: string;
    /**
     * The username used for authorization.
     */
    sessionUsername?: string;
}

export namespace Session {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Session';


}